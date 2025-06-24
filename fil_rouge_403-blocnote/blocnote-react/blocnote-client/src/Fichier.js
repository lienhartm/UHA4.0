import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import BlocNote from "./BlocNote";

function Fichier({ closeFichier, onSelectComponent }) {
  const { adminToken, userToken } = useContext(AuthContext);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [noteTitle, setTitle] = useState("");
  const [noteContent, setContent] = useState("");

  const url = `${window.location.protocol}//${window.location.hostname}:4000`;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        setFileName(file.name);

        const title = file.name.split(".").slice(0, -1).join(".");
        setTitle(title);
        setContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveLocal = () => {
    const contentToSave = noteContent || fileContent;
    const fileNameToSave = noteTitle || fileName || "nouvelle_note.txt";

    if (!contentToSave) {
      setMessage("Le fichier est vide.");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([contentToSave], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileNameToSave}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleErase = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer le contenu ?")) {
      setFileContent("");
      setFileName("");
      setTitle("");
      setContent("");
      setMessage("");
    }
  };

  const handleSaveCloud = async () => {
    const contentToSave = noteContent || fileContent;
    const titleToSave = noteTitle || fileName;

    if (!contentToSave) {
      setMessage("Le fichier est vide.");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`;
      } else {
        setMessage("Session expirée !");
      }

      if (userToken) {
        headers["X-User-Authorization"] = `Bearer ${userToken}`;
      } else {
        setMessage("Session expirée ")
      }

      const response = await fetch(`${url}/notes`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ titre: titleToSave, contenu: contentToSave }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setMessage(result.message);
      } else {
        setMessage("Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div id="bloc">
      <div id="visiteur">
        <h2>Gestion de fichier</h2>
        {adminToken && (
          <button
            id="btn-note"
            aria-label="Notes"
            onClick={() => onSelectComponent("note")}
          >
            Notes
          </button>
        )}
        <button
          id="btn-televerse"
          aria-label="Téléverser un document"
          onClick={() => document.getElementById("fichier").click()}
        >
          Téléverser un document
        </button>
        <input
          type="file"
          id="fichier"
          data-testid="file-input"
          className="hidden"
          accept=".txt"
          onChange={handleFileUpload}
        />
        <button
          id="btn-save"
          aria-label="Enregistrement Local"
          onClick={handleSaveLocal}
        >
          Enregistrement Local
        </button>
        {adminToken && (
          <button
            id="btn-cloud"
            aria-label="Enregistrement Cloud"
            onClick={handleSaveCloud}
          >
            Enregistrement Cloud
          </button>
        )}
        <button id="btn-efface" aria-label="Effacer" onClick={handleErase}>
          Effacer
        </button>
        <button id="btn-close" aria-label="Fermer" onClick={closeFichier}>
          Fermer
        </button>
        {message && <p className="error">{message}</p>}
      </div>
      <BlocNote
        title={noteTitle}
        content={noteContent}
        setTitle={setTitle}
        setContent={setContent}
      />
    </div>
  );
}

export default Fichier;
