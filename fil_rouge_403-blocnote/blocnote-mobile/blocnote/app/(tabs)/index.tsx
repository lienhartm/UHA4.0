import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import NetInfo from "@react-native-community/netinfo";

const BlocNote = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("attente");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showList, setShowList] = useState(true);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const toggleSignIn = () => setIsSignInVisible(!isSignInVisible);
  const closeNote = () => {
    setSelectedNote(null);
    setShowList(true);
  };

  const octet = 100 / 1024 / 100;

  // Stockage du token à l'aide de AsyncStorage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Erreur lors du stockage du token:", error);
    }
  };

  // Verifie si la connexion est correcte
  const checkNetworkConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };  

  // Mise en place de l'objet Note
  interface Note {
    _id: string;
    titre: string;
    contenu: string;
    status: "attente" | "accepter" | "refuser" | "terminer";
  }

  const [documents, setDocuments] = useState<Note[]>([]);

  /////////////////////////////
  // Gestion de la connexion //
  /////////////////////////////

  const handleLogin = async () => {
    const url = `${window.location.protocol}//${window.location.hostname}:4000`;
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifiant, motdepasse }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Succès", data.message);
        await storeToken(data.data.accessToken);
        toggleSignIn();
        fetchDocuments();
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème de connexion au serveur.");
      console.log(error);
    }
  };

  ////////////////////////////////////////////////////////////
  // Fonction pour récupérer les documents de l'utilisateur //
  ////////////////////////////////////////////////////////////

  const fetchDocuments = async () => {
    try {

      const cachedNotes = await AsyncStorage.getItem("cachedNotes");
  
      if (cachedNotes !== null) {

        setDocuments(JSON.parse(cachedNotes));
        console.log("Notes chargées depuis AsyncStorage.");
        await syncLocalChangesToServer();
      }

      const url = `${window.location.protocol}//${window.location.hostname}:4000`;
      const storedToken = await AsyncStorage.getItem("accessToken");

      if (!storedToken) {
        return;
      }
  
      const response = await fetch(`${url}/notes`, {
        method: "GET",
        headers: {
          "X-User-Authorization": `Bearer ${storedToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {

        setDocuments(data.notes);

        await AsyncStorage.setItem("cachedNotes", JSON.stringify(data.notes));
        console.log("Notes mises à jour et enregistrées dans AsyncStorage.");
      } else if (response.status === 401) {
        console.log("Accès non autorisé. Veuillez vous connecter.");
      } else if (response.status === 404) {
        console.log("Aucune note trouvée.");
      } else {
        console.log("Erreur lors du chargement des documents:", data.message);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };
  

  //////////////////////////////////////////////////
  // Fonction pour modifier le status d'une note //
  ////////////////////////////////////////////////

  const handleStatusChange = async (noteId: string, newStatus: string) => {
    try {
      const url = `${window.location.protocol}//${window.location.hostname}:4000`;
      const storedToken = await AsyncStorage.getItem("accessToken");

      const isConnected = await checkNetworkConnection();
  
      if (isConnected) {

        const response = await fetch(`${url}/notes/${noteId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-User-Authorization": `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Statut mis à jour avec succès.");
          fetchDocuments();
        } else {
          console.log("Erreur lors de la mise à jour du statut", data.message);
        }
      } else {

        console.log("Connexion indisponible, mise à jour locale du statut.");
        await updateNoteStatusLocally(noteId, newStatus);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

    ///////////////////////////////////////////////////////////////////////
   // Fonction pour mettre à jour une note localement dans AsyncStorage //
  ///////////////////////////////////////////////////////////////////////

  const updateNoteStatusLocally = async (noteId: string, newStatus: string) => {
    try {
      
      const cachedNotes = await AsyncStorage.getItem("cachedNotes");
      const notes = cachedNotes ? JSON.parse(cachedNotes) : [];
  
      const noteToUpdate = notes.find(note => note._id === noteId);
      if (noteToUpdate) {
        noteToUpdate.status = newStatus; // Modifier le statut
        noteToUpdate.needsSync = true;

        await AsyncStorage.setItem("cachedNotes", JSON.stringify(notes));
      console.log("Statut de la note mis à jour localement.");

      setDocuments(notes);
    }} catch (error) {
      console.error("Erreur lors de la mise à jour locale des notes:", error);
    }
  };
  
    /////////////////////////////////////////////////////////////////////////////////////////
   // Fonction pour synchroniser les modifications locales lors du retour de la connexion //
  /////////////////////////////////////////////////////////////////////////////////////////

  const syncLocalChangesToServer = async () => {
    try {

      const cachedNotes = await AsyncStorage.getItem("cachedNotes");
      const notes = cachedNotes ? JSON.parse(cachedNotes) : [];

      const storedToken = await AsyncStorage.getItem("accessToken");
      const url = `${window.location.protocol}//${window.location.hostname}:4000`;

      for (const note of notes) {
        if (note.needsSync) {
          const response = await fetch(`${url}/notes/${note._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "X-User-Authorization": `Bearer ${storedToken}`,
            },
            body: JSON.stringify({ status: note.status }),
          });
          
          if (response.ok) {
            console.log(`Note ${note._id} synchronisée avec succès.`);

            note.needsSync = false;
          } else {
            console.log(`Erreur lors de la synchronisation de la note ${note._id}`);
          }
        }
      }

      await AsyncStorage.setItem("cachedNotes", JSON.stringify(notes));
    } catch (error) {
      console.error("Erreur lors de la synchronisation avec le serveur:", error);
    }
  };  

    /////////////////////////////
   // Fonction de déconnexion //
  /////////////////////////////

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");

      setIdentifiant("");
      setMotdepasse("");
      setDocuments([]);
      Alert.alert(
        "Déconnexion réussie",
        "Vous avez été déconnecté avec succès.",
      );
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      Alert.alert("Erreur", "Il y a eu un problème lors de la déconnexion.");
    }
  };

    /////////////////////////////////////////////
   // Permet l'affichage du détail d'une note //
  /////////////////////////////////////////////

  const handleViewNote = (noteId: string) => {
    const note = documents.find((doc) => doc._id === noteId);
    setSelectedNote(note);
    setShowList(false);
  };

    ////////////////////////////////
   // Permet un affichage à jour //
  ////////////////////////////////
  
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>BlocNote</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>&#x2756;</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Notes */}
      {showList && (
        <View style={styles.noteSection}>
          <View style={styles.titleDocument}>
            {documents.length > 0 ? (
              <>
                <Text style={styles.titleSpan}>Mes Documents</Text>
                <Text style={styles.stockSpan}>
                  Total :{" "}
                  {(
                    octet *
                    documents.reduce((acc, doc) => acc + doc.contenu.length, 0)
                  ).toFixed(2)}{" "}
                  Ko
                </Text>
              </>
            ) : (
              <Text style={styles.titleSpan}>Aucun Document</Text>
            )}
          </View>

          <FlatList
            data={documents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.documentItem}>
                <Text style={styles.noteTitle}>{item.titre}</Text>
                <Text style={styles.noteContenu}>
                  {(octet * item.contenu.length).toFixed(2)} Ko
                </Text>
                <Text style={styles.noteStatus}>{item.status}</Text>

                {/* Status Selector */}
                {item.status === "attente" && (
                  <Picker
                    selectedValue={selectedStatus}
                    style={styles.statusSelector}
                    onValueChange={(itemValue: string) => {
                      setSelectedStatus(itemValue);
                      handleStatusChange(item._id, itemValue);
                    }}
                  >
                    <Picker.Item label="Status ..." value="" />
                    <Picker.Item label="Accepter" value="accepter" />
                    <Picker.Item label="Refuser" value="refuser" />
                  </Picker>
                )}

                {/* Terminer Button */}
                {item.status === "accepter" && (
                  <TouchableOpacity
                    style={styles.statusSelector}
                    onPress={() => handleStatusChange(item._id, "terminer")}
                  >
                    <Text>Terminer</Text>
                  </TouchableOpacity>
                )}

                {/* Voir Button */}
                <TouchableOpacity
                  style={styles.statusSelector}
                  onPress={() => handleViewNote(item._id)}
                >
                  <Text>Voir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* Lecture de la note */}
      {selectedNote && (
        <View style={styles.noteDisplay}>
          <Text style={styles.noteDisplayTitre}>{selectedNote.titre}</Text>
          <View style={styles.documentItem}>
            <Text style={styles.noteDisplayStatus}>
              Status: {selectedNote.status}
            </Text>
          </View>
          <Text style={styles.noteDisplayContenu}>{selectedNote.contenu}</Text>
          <TouchableOpacity style={styles.noteClose} onPress={closeNote}>
            <Text>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menu Modal */}
      <Modal visible={isMenuVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gestion de compte</Text>
            <Button title="Se connecter" onPress={toggleSignIn} />
            <Button title="Se déconnecter" onPress={logout} />
            <Button title="Fermer" onPress={toggleMenu} />
          </View>
        </View>
      </Modal>

      {/* Sign-in Modal */}
      <Modal visible={isSignInVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Connexion</Text>
            <TextInput
              style={styles.input}
              placeholder="Identifiant"
              value={identifiant}
              onChangeText={setIdentifiant}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              value={motdepasse}
              onChangeText={setMotdepasse}
            />
            <Button title="Se connecter" onPress={handleLogin} />
            <Button title="Fermer" onPress={toggleSignIn} />
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>UHA 4.0 - FIL ROUGE 4.0.3 - BlocNote - LIENHART Michaël</Text>
      </View>
    </ScrollView>
  );
};

export default BlocNote;
