import React, { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Inscription from "./Inscription";
import { AuthProvider } from "./AuthContext";
import Connexion from "./Connexion";
import Modification from "./Modification";
import Reset from "./Reset";
import Erase from "./Erase";
import Fichier from "./Fichier";
import Note from "./Note";
import Footer from "./Footer";
import User from "./User"; // N'oubliez pas d'importer User

function App() {
  const [visibleComponent, setVisibleComponent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  function showComponent(componentName) {
    setVisibleComponent(componentName);
  }

  function closeComponent() {
    setVisibleComponent("");
  }

  return (
    <>
      <AuthProvider>
        <Header
          showComponent={showComponent}
          visibleComponent={visibleComponent}
        />

        <main>
          {/* Affiche le composant en fonction de l'état visibleComponent */}
          {visibleComponent === "menu" && (
            <Menu
              closeMenu={closeComponent}
              onSelectComponent={showComponent}
            />
          )}
          {visibleComponent === "fichier" && (
            <Fichier
              onSelectComponent={showComponent}
              closeFichier={closeComponent}
            />
          )}
          {visibleComponent === "user" && <User />}{" "}
          {/* Gérer le composant User */}
          {visibleComponent === "inscription" && (
            <Inscription closeInscription={closeComponent} />
          )}
          {visibleComponent === "connexion" && (
            <Connexion closeConnexion={closeComponent} />
          )}
          {visibleComponent === "modification" && (
            <Modification closeModification={closeComponent} />
          )}
          {visibleComponent === "erase" && (
            <Erase closeErase={closeComponent} />
          )}
          {visibleComponent === "reset" && (
            <Reset closeReset={closeComponent} />
          )}
          {visibleComponent === "note" && (
            <Note
              closeNote={closeComponent}
              setTitle={setNoteTitle}
              setContent={setNoteContent}
              onSelectComponent={showComponent}
            />
          )}
          {visibleComponent === ""}
        </main>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
