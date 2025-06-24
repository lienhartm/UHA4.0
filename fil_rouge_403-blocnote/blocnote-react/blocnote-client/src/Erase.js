import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Erase({ closeErase }) {
  const [message, setMessage] = useState("");
  const { adminToken, userToken, logoutUser } = useContext(AuthContext);

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const handleDelete = async () => {
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
        method: "DELETE",
        headers: headers,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);

        logoutUser();
        closeErase();
      }
    } catch (error) {
      setMessage("Erreur lors de la suppression du compte");
    }
  };

  return (
    <>
      {/* Confirmation de suppression du compte */}
      <div id="popup-erase">
        <div className="popup-content">
          <h2>Confirmez la suppression de votre dossier</h2>
          <button onClick={handleDelete}>Oui</button>
          <button onClick={closeErase}>Non</button>
          {message && <p className="success">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Erase;
