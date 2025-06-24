import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Connexion({ closeConnexion }) {
  const [identifiant, setIdentifiant] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");
  const { loginAdmin, loginUser } = useContext(AuthContext);
  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifiant, motdepasse }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.module) {
          loginAdmin(result.data.accessToken);
          loginUser("");
        } else {
          loginUser(result.data.accessToken);
        }
        setMessage(result.message);
        closeConnexion();
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage("Erreur de connexion");
    }
  };

  return (
    <>
      <div id="popup-connexion">
        <div className="popup-content">
          {/* admin is numero when user is numero */}
          <h2>Ouvrir un dossier</h2>
          <form id="connexion-form" onSubmit={handleSubmit}>
            <label htmlFor="identifiant">Identifiant:</label>
            <input
              type="text"
              id="identifiant"
              name="identifiant"
              pattern="[A-Za-z]*"
              required
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
            />
            <label htmlFor="motdepasse-connexion">Mot de passe:</label>
            <input
              type="password"
              id="motdepasse-connexion"
              name="motdepasse"
              pattern="[0-9]{10}"
              required
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
            />
            <button type="submit">Se connecter</button>
          </form>
          {message && <p className="error">{message}</p>}
          <button id="btn-close-connexion" onClick={closeConnexion}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

export default Connexion;
