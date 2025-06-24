import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Note({ closeNote, setTitle, setContent, onSelectComponent }) {
  const { userToken, adminToken } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [error, setError] = useState("");

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  useEffect(() => {
    const loadNotes = async () => {
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

        const response = await fetch(`${url}/notes`, {
          method: "GET",
          headers: headers,
        });

        const result = await response.json();

        if (response.ok) {
          setNotes(result.notes);

          const size = result.notes.reduce(
            (acc, note) => acc + new Blob([note.contenu]).size,
            0,
          );
          setTotalSize(size);
        } else {
          setError("Les données reçues ne sont pas valides.");
        }
      } catch (error) {
        setError("Erreur serveur");
      }
    };

    loadNotes();
  }, [adminToken, userToken]);

  // Logique pour éditer la note
  const handleEdit = (note) => {
    setTitle(note.titre);
    setContent(note.contenu);
    onSelectComponent("blocnote");
  };

  // Logique pour télécharger la note
  const handleDownload = (id, title) => {
    const note = notes.find((note) => note._id === id);

    if (note) {
      const blob = new Blob([note.contenu], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleDelete = async (id) => {
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
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        setError("");
      } else {
        setError("Erreur lors de la suppression de la note.");
      }
    } catch (error) {
      setError("Erreur serveur.");
    }
  };

  const octet = 100 / 1024;
  const space = " - ";

  return (
    <>
      {/* Affichage du cloud d'un utilisateur avec la taille de l'espace de stockage utilisé */}
      <div id="doc-popup">
        <div className="popup-content">
          <h2>Mes Documents</h2>
          <p id="total-ko">
            {Array.isArray(notes) && notes.length > 0
              ? `Taille du stockage : ${(totalSize * octet).toFixed(2)} Ko / 10 Ko`
              : ""}
          </p>
          <ul id="note-list">
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map((note) => (
                <li key={note._id} className="doc-item">
                  <span>{note.titre}</span>
                  {space}
                  <span>{note.status}</span>
                  {space}
                  <span>
                    {(octet * new Blob([note.contenu]).size).toFixed(2)} Ko
                  </span>
                  <div>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(note)}
                    >
                      Éditer
                    </button>
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(note._id, note.titre)}
                    >
                      Télécharger
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(note._id)}
                      data-testid={`delete-note-${note._id}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>Aucunes notes</p>
            )}
          </ul>
          <button id="close-popup" onClick={closeNote}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}

export default Note;
