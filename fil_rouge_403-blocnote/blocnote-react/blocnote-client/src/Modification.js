import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Modification({ closeModification }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");
  const { adminToken, userToken } = useContext(AuthContext);

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`;
      }

      if (userToken) {
        headers["X-User-Authorization"] = `Bearer ${userToken}`;
      }

      const response = await fetch(`${url}/personnes`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ nom, prenom, numero: motdepasse }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        closeModification();
      } else {
        setMessage(result.error || "Erreur lors de la modification");
      }
    } catch (error) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <>
      {/*<!-- Pop-up pour la modification du profil utilisateur -->*/}
      <div id="popup-modification">
        <div className="popup-content">
          <h2>Modifier le dossier</h2>
          <form id="edit-profile-form" onSubmit={handleSubmit}>
            {/*  seulement admin */}
            <label htmlFor="modif-nom">Nom:</label>
            <input
              type="text"
              id="modif-nom"
              name="nom"
              pattern="[A-Z][a-z]*"
              required
              title="Le nom doit commencer par une majuscule"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            {/* seulement admin */}
            <label htmlFor="modif-prenom">Objet:</label>
            <input
              type="text"
              id="modif-prenom"
              name="prenom"
              pattern="[A-Z][a-z]*"
              required
              title="Le prénom doit commencer par une majuscule"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            {/* if admin is numero when user is motdepase */}
            <label htmlFor="modif-motdepasse">Nouveau mot de passe:</label>
            <input
              type="text"
              id="modif-motdepasse"
              pattern="[0-9]{10}"
              name="motdepasse"
              required
              title="Le mot de passe doit contenir dix chiffres"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
            />
            <button type="submit">Sauvegarder</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button id="btn-close-edit" onClick={closeModification}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

export default Modification;
