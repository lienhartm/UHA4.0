import React, { useState, useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";

function Inscription({ closeInscription }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const { adminToken, userToken } = useContext(AuthContext);

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const inscriptionForm = async (e) => {
    e.preventDefault();

    const utilisateur = {
      nom: nom,
      prenom: prenom,
      numero: motDePasse,
    };

    try {
      const response = await fetch(`${url}/personnes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(utilisateur),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inscription réussie !");
      } else {
        setMessage(data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      {/*<!-- Pop-up pour le formulaire d'inscription -->*/}
      <div id="popup-inscription">
        <div className="popup-content">
          <h2>Crééer Dossier</h2>
          <form id="inscription-form" onSubmit={inscriptionForm}>
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              name="nom"
              pattern="[A-Z][a-z]*"
              required
              title="Le nom doit commencer par une majuscule"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <label htmlFor="prenom">Objet:</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              pattern="[A-Z][a-z]*"
              required
              title="Le prénom doit commencer par une majuscule"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <label htmlFor="motdepasse-inscription">Mot de passe:</label>
            <input
              type="text"
              id="motdepasse-inscription"
              name="motdepasse"
              pattern="[0-9]{10}"
              required
              title="Le mot de passe doit être de dix chiffres"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
            <button type="submit">Crééer</button>
          </form>
          {message && <p>{message}</p>}
          <button id="btn-close-inscription" onClick={closeInscription}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

export default Inscription;
