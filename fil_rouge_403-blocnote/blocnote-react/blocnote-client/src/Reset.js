import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Reset({ closeReset }) {
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);
  const { userToken, adminToken } = useContext(AuthContext);

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const handleReset = async (id) => {
    const url = `${window.location.protocol}//${window.location.hostname}:4000`;

    if (!window.confirm("Voulez-vous vraiment supprimer cette note ?")) {
      return;
    }

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

      const response = await fetch(`${url}/notes/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Espace effacé avec succès.");

        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        setMessage("Erreur lors de l'effacement de l'espace.");
      }
    } catch (error) {
      setMessage("Erreur serveur.");
    }
  };

  return (
    <>
      {/* Confirmation pour la remise à zéro de l'espace de stockage */}
      <div id="popup-erase">
        <div className="popup-content">
          <h2>Confirmez-vous la remise à zéro de votre espace de stockage ?</h2>
          <button onClick={handleReset}>Oui</button>
          <button onClick={closeReset}>Non</button>
          {message && <p className="error">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Reset;
