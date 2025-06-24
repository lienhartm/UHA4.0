const url = `${window.location.protocol}//${window.location.hostname}:4000`;

document.addEventListener("DOMContentLoaded", function () {

    ////////////////////////////////////////////
   // Vérifier si l'utilisateur est connecté //
  ////////////////////////////////////////////

  const accessToken = localStorage.getItem("accessToken") ? true : false;

  if (accessToken) {
    document.getElementById('btn-inscription').classList.add("hidden");
    document.getElementById('btn-connexion').classList.add("hidden");
    document.getElementById('btn-modification').classList.remove("hidden");
    document.getElementById('btn-suppression').classList.remove("hidden");
    document.getElementById('btn-deconnexion').classList.remove("hidden");
    document.getElementById('btn-note').classList.remove("hidden");
    document.getElementById('btn-cloud').classList.remove("hidden");
    document.getElementById('btn-resetdb').classList.remove("hidden");
  }

});

  ///////////////////////////
 // Ouvrir la pop-up menu //
///////////////////////////

 document.getElementById('btn-menu').addEventListener("click", function () {
  document.getElementById('popup-menu').classList.toggle("show");
});

  ///////////////////////////
 // Fermer la pop-up menu //
///////////////////////////

document.getElementById('btn-close').addEventListener("click", function () {
  document.getElementById('popup-menu').classList.remove("show");
});

  ////////////////////////////////////
 // Ouvrir la pop-up d'inscription //
////////////////////////////////////

document.getElementById('btn-inscription').addEventListener("click", function () {
  document.getElementById('popup-menu').classList.remove("show");
  document.getElementById('popup-inscription').classList.add("show");
  });

  ////////////////////////////////////
 // Fermer la pop-up d'inscription //
////////////////////////////////////

document.getElementById('btn-close-inscription').addEventListener("click", function () {
  document.getElementById('popup-inscription').classList.remove("show");
  });

  ///////////////////////////////////
 // Ouvrir la pop-up de connexion //
///////////////////////////////////

document.getElementById('btn-connexion').addEventListener("click", function () {
  document.getElementById('popup-menu').classList.remove("show");
  document.getElementById('popup-connexion').classList.add("show");
});

  ///////////////////////////////////
 // Fermer la pop-up de connexion //
///////////////////////////////////

document.getElementById('btn-close-connexion').addEventListener("click", function () {
  document.getElementById('popup-connexion').classList.remove("show");
  });

  //////////////////////////////////////
 // Ouvrir la pop-up de modification //
//////////////////////////////////////

document.getElementById('btn-modification').addEventListener("click", function () {
  document.getElementById('popup-menu').classList.remove("show");
  document.getElementById('popup-modification').classList.add("show");
  });

  //////////////////////////////////////
 // Fermer la pop-up de modification //
//////////////////////////////////////

document.getElementById('btn-close-edit').addEventListener("click", function () {
  document.getElementById('popup-modification').classList.remove("show");
  });

  ////////////////////////////////////
 // Ouvre le sélecteur de fichiers //
////////////////////////////////////

document.getElementById('btn-televerse').addEventListener("click", function () {
  document.getElementById("fichier").click();
});

  ///////////////////////////////////
 // Efface le contenu du textarea //
///////////////////////////////////

document.getElementById('btn-efface').addEventListener("click", function () {
  document.getElementById('statusnote').textContent = "";
  document.getElementById('titrenote').value = "";
  document.getElementById('commentaire').value = "";
  document.getElementById("fichier").value = "";
  document.getElementById("char-count-text").textContent = "0 / 1024 caractères";
});

  ///////////////////////////
 // Téléverser un fichier //
///////////////////////////

document.getElementById("fichier").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file && file.type !== "text/plain") {
    alert("Veuillez sélectionner un fichier .txt");
    event.target.value = "";
  } else if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;
      document.getElementById('commentaire').value = fileContent;
      document.getElementById("char-count-text").textContent = `${fileContent.length} / 1024 caractères`;
    };
    reader.readAsText(file);
    const fileName = file.name.split(".").slice(0, -1).join(".");
    document.getElementById('titrenote').value = fileName;
  }
});

  /////////////////////////////////////////////
 // Enregistrement local d'un fichier *.txt //
/////////////////////////////////////////////

document.getElementById('btn-save').addEventListener("click", function () {
  const content = document.getElementById('commentaire').value;
  const titreValue = document.getElementById('titrenote').value || "note";
  const SIZE_LIMIT = 1024;

  if (content) {
    if (content.length > SIZE_LIMIT) {
      alert(
        "Le contenu dépasse la taille limite de 1 Ko. Veuillez réduire le contenu avant d'enregistrer."
      );
      return;
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${titreValue}.txt`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    alert("Aucun contenu à enregistrer.");
  }
});

  ///////////////////////////////////////////////////////
 // Détermine le nombre de caractère dans le textarea //
///////////////////////////////////////////////////////

document.getElementById('commentaire').addEventListener("input", function updateCharCount() {
    const textLength = document.getElementById('commentaire').value.length;
    const maxChars = 1024;

    document.getElementById("char-count-text").textContent = `${textLength} / ${maxChars} caractères`;

    if (textLength > maxChars) {
      document.getElementById("char-count-text").style.color = "red";
    } else {
      document.getElementById("char-count-text").style.color = "black";
    }
  });

/*******************************************
 *        /////////////////////////////////
 *       // REQUETES GESTIONS DE COMPTE //
 *      /////////////////////////////////
 *//////////////////////////////////////

  ////////////////////////////////////////
 // Requête d'inscription utilisateur //
//////////////////////////////////////

function inscriptionForm(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const motdepasse = document.getElementById("motdepasse-inscription").value;

  fetch(`${url}/personnes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nom, prenom, numero: motdepasse }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Inscription réussie");
        document.getElementById('popup-inscription').classList.remove("show");
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    });
}

  //////////////////////////////////////
 // Requête de connexion utilisateur //
//////////////////////////////////////

function connexionForm(event) {
  event.preventDefault();

  const identifiant = document.getElementById("identifiant").value;
  const motdepasse = document.getElementById("motdepasse-connexion").value;

  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifiant, motdepasse }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Connexion réussie") {
        document.getElementById('popup-connexion').classList.remove("show");

        localStorage.setItem("accessToken", data.accessToken);
        alert("Connexion réussie");
        location.reload();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Erreur:", error));
}

  /////////////////////////////
 // Déconnexion utilisateur //
/////////////////////////////

document.getElementById('btn-deconnexion').addEventListener("click", function () {
    localStorage.removeItem("accessToken");
    alert("Déconnexion réussie");
    location.reload();
  });

  ///////////////////////////
 // Suppression de compte //
///////////////////////////

document.getElementById('btn-suppression').addEventListener("click", function () {
    const confirmation = confirm(
      "Voulez-vous vraiment supprimer votre compte ?"
    );
    if (confirmation) {

      fetch(`${url}/personnes`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Compte supprimé") {
            localStorage.removeItem("accessToken");
            alert("Compte supprimé avec succès");
            location.reload();
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.error("Erreur:", error));
    }
  });

  //////////////////////////////////////////////
 // Formulaire de modification d'utilisateur //
//////////////////////////////////////////////

function modificationForm(event) {
  event.preventDefault();

  const nom = document.getElementById("modif-nom").value;
  const prenom = document.getElementById("modif-prenom").value;
  const motdepasse = document.getElementById("modif-motdepasse").value;

  fetch(`${url}/personnes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nom, prenom, numero: motdepasse }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Informations modifiées avec succès") {
        alert("Informations modifiées");
        document.getElementById('popup-modification').classList.remove("show");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Erreur:", error));
}

/******************************************
 *        ////////////////////////////////
 *       // REQUETE GESTION DE FICHIER //
 *      ////////////////////////////////
 */////////////////////////////////////

  ////////////////////////////////////////////////////
 // Requete pour l'enregistrement cloud d'une note //
////////////////////////////////////////////////////

document.getElementById('btn-cloud').addEventListener("click", function () {
  const titre = document.getElementById('titrenote').value;
  const contenu = document.getElementById('commentaire').value;

  const maxSize = 1024;
  const contenuSize = new Blob([contenu]).size;

  if (titre && contenu) {
    if (contenuSize > maxSize) {
      alert("Le contenu de la note dépasse la taille maximale de 1 Ko.");
      return;
  }

    fetch(`${url}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        titre: titre,
        contenu: contenu,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Note créée") {
          alert("Note enregistrée dans le cloud !");
        } else {
          alert("Erreur lors de l'enregistrement : " + data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de l'enregistrement.");
      });
  }
  else {
    alert("Veuillez remplir le titre et le contenu.");
  }

});

  ///////////////////////////////////////////////////////////
 // Ouvrir la pop-up des documents cloud d'un utilisateur //
///////////////////////////////////////////////////////////

document.getElementById('btn-note').addEventListener("click", function () {
  fetch(`${url}/notes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((notes) => {
      const docList = document.getElementById('note-list');
      docList.innerHTML = "";

      const totalSize = notes.reduce((acc, note) => {
        return acc + new Blob([note.contenu]).size;
      }, 0);

      const octet = 100 / 1024;

      document.getElementById("total-ko").innerHTML = `Taille du stockage : ${(
        (octet * totalSize) /
        100
      ).toFixed(2)} Ko / 10 Ko`;

      notes.forEach((note) => {
        
        const noteItem = document.createElement("div");
        noteItem.className = "doc-item";
        noteItem.innerHTML = `
                    <span>${note.titre}</span> - 
                    <sapn>Status: ${note.status}</span> - 
                    <span>${(
            (octet * new Blob([note.contenu]).size) /
            100
          ).toFixed(2)} ko</span>
                    <div>
                        <button class="btn-edit" data-id="${note._id
          }">Éditer</button>
                        <button class="btn-download" data-id="${note._id
          }" data-title="${note.titre}">Télécharger</button>
                        <button class="btn-delete" data-id="${note._id
          }">Supprimer</button>
                    </div>
                `;
        docList.appendChild(noteItem);
      });

      document.getElementById('doc-popup').classList.add("show");
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des documents.");
    });
});

  ///////////////////////////////////////////////////
 // Gérer la fermeture de la pop-up des documents //
///////////////////////////////////////////////////

document.getElementById('close-popup').addEventListener("click", function () {
  document.getElementById('doc-popup').classList.remove("show");
});

  ////////////////////////////////////////////////////////////////////////////
 // Ajouter les gestionnaires pour les boutons d'édition et de suppression //
////////////////////////////////////////////////////////////////////////////

document.getElementById('note-list').addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-edit")) {
      const noteId = event.target.getAttribute("data-id");

      fetch(`${url}/notes/${noteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json())
        .then((note) => {
          document.getElementById('statusnote').textContent = `Status: ${note.status}`;
          document.getElementById('titrenote').value = note.titre;
          document.getElementById('commentaire').value = note.contenu;
          document.getElementById("char-count-text").textContent = `${note.contenu.length} / 1024 caractères`;
          document.getElementById('doc-popup').classList.remove("show");
        })
        .catch((error) => {
          console.error("Erreur:", error);
          alert("Erreur lors du chargement de la note.");
        });
    } else if (event.target.classList.contains("btn-delete")) {
      const noteId = event.target.getAttribute("data-id");
      fetch(`${url}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          alert(result.message || "Note supprimée.");
          document.getElementById('btn-note').click(); // Recharger la liste des documents
        })
        .catch((error) => {
          console.error("Erreur:", error);
          alert("Erreur lors de la suppression de la note.");
        });
    } else if (event.target.classList.contains("btn-download")) {
      const noteId = event.target.getAttribute("data-id");
      const noteTitle = event.target.getAttribute("data-title");

      fetch(`${url}/notes/${noteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json())
        .then((note) => {
          const blob = new Blob([note.contenu], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${noteTitle}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Erreur:", error);
          alert("Erreur lors du téléchargement de la note.");
        });
    }
  });

  ///////////////////////////////////////////////////////
 // Routes pour remise à zéro de l'espace de stockage //
///////////////////////////////////////////////////////

document.getElementById('btn-resetdb').addEventListener("click", function () {
  fetch(`${url}/notes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message || "Notes supprimées.");
      document.getElementById('btn-note').click();
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression des notes.");
    });
});

/**EOF */