import React from "react";

function BlocNote({ title, content, setTitle, setContent }) {
  return (
    <>
      {/* Champ pour le titre de la note */}
      <input
        type="text"
        id="titrenote"
        placeholder="Titre de la note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Textarea pour le contenu de la note */}
      <textarea
        id="commentaire"
        placeholder="Écrivez votre note ici..."
        rows="20"
        cols="100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Compteur de caractères */}
      <div id="char-count">
        <p id="char-count-text">{content.length} / 1024 caractères</p>
      </div>
    </>
  );
}

export default BlocNote;
