import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function User() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { adminToken } = useContext(AuthContext);

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url}/personnes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setUsers(result.personnes);
        } else {
          setError("Erreur lors du chargement des utilisateurs.");
        }
      } catch (error) {
        setError("Erreur serveur");
      }
    };

    if (adminToken) {
      fetchUser();
    }
  }, [adminToken]);

  return (
    <div className="popup-content">
      <h3>Liste des dossiers</h3>
      {error && <p className="error">{error}</p>}
      {Array.isArray(users) && users.length > 0 ? (
        <>
          <strong>Nom - Objet - Numéro</strong>
          <ul id="note-list">
            {users.slice(1).map((user) => (
              <li key={user._id} className="doc-item">
                {`${user.nom} - ${user.prenom} - ${user.numero}`}
              </li>
            ))}
          </ul>
        </>
      ) : (
        !error && <p>Aucun dossier trouvé.</p>
      )}
    </div>
  );
}

export default User;
