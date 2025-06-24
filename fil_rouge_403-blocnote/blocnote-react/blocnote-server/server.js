const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const mongoDB = process.env.MONGODB;

const Personne = require("./models/Personne");
const Note = require("./models/Note");

const app = express();

app.use(cors());

const port = 4000;

app.use(express.json());

let accessToken;
let mongo = false;

/*************
/  
/   BLOCNOTE
/
*/ ///////////

/////////////////////////
// Connexion à MongoDB //
/////////////////////////

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => { mongo = true; console.log("Connected to MongoDB");})
  .catch((err) => { mongo = false; console.error("Error connecting to MongoDB", err);});

  ////////////////////
 // rapport server //
////////////////////

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});


/////////////////
// Page index ///
/////////////////

app.get("/", (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const versions = {
    node: process.version, // Version de Node.js
    express: require("express/package.json").version, // Version d'Express
    mongoose: require("mongoose/package.json").version, // Version de Mongoose
    dotenv: require("dotenv/package.json").version, // Version de Dotenv
    cors: require("cors/package.json").version, // Version de CORS
  };

  res.status(200).send(`
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="description" content="BLOCNOTE" />
          <meta name="keywords" content="Traitement de texte, Note" />
          <meta name="author" content="LIENHART Michaël" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>BlocNote</title>
          <link rel="icon" href="favicon.ico" type="image/x-icon" />
          <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }

            tr:nth-child(even) {
              background-color: #dddddd;
            }
          </style>
          <script type="module">
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({ startOnLoad: true });
          </script>
        </head>
        <body>
          <h1>Bienvenue sur ma page server BlocNote</h1>
          <blockquote>
          <p>API : BlocNote</p>
          <p>Url : ${fullUrl}</p>
          <p>Db : ${mongo ? '<span style="background-color:green;padding:5px 20px;border-radius:50%;margin-left:20px;"></span>' : '<span style="background-color:red;padding:5px 20px;border-radius:50%;margin-left:20px;"></span>'}</p>
          <br>
          <blockquote>
          <p>Dépendences installée :</p>
          <ul>
            <li>Node : ${versions.node}</li>
            <li>Express : ${versions.express}</li>
            <li>Mongoose : ${versions.mongoose}</li>
            <li>Dotenv : ${versions.dotenv}</li>
            <li>Cors : ${versions.cors}</li>
          </ul>
          </blockquote>
            <pre class="mermaid">
            ---
            title: BlocNote - Diagramme de classe
            ---
            classDiagram
            direction LR
              Notes <|-- Personnes
              Notes : +int id
              Notes : +int id.personnes
              Notes : +String titre
              Notes : +String contenu
              class Personnes{
                +int : id
                +String: nom
                +String: prenom
                +String: numero
              }
          </pre>
          <p>Description de l'interface</p>
          <table border="1">
            <tr>
              <th>Requêtes</th>
              <th>Chemins</th>
              <th>Fonctions</th>
              <th>Protégées (*)</th>
            </tr>
            <tr>
              <td>GET</td>
              <td>/personnes</td>
              <td>Lister les personnes</td>
              <td>*</td>
            <tr>
              <td>POST</td>
              <td>/personnes</td>
              <td>Inscrire une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/personnes</td>
              <td>Modifier une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/personnes</td>
              <td>Supprimer une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/login</td>
              <td>Se connecter</td>
              <td>TOKEN</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/notes</td>
              <td>Enregistrer une note d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/notes</td>
              <td>Lire toutes les notes d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/notes</td>
              <td>Supprimer toutes les notes d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/notes/id_note</td>
              <td>Lire une note d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/notes/id_note</td>
              <td>Modifier une note d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/notes/id_note</td>
              <td>Supprimer une note d'une personne</td>
              <td>*</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/notes</td>
              <td>Supprime toutes les notes de tous les utilisateurs</td>
              <td>*</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/personnes</td>
              <td>Supprime tous les utilisateurs</td>
              <td>*</td>
            </tr>
          </table>
          </blockquote>
        </body>
      </html>
    `);
});

/***********************
/ 
/    AUTHENTIFICATION
/ 
*/ /////////////////////

///////////////////////////////////////////
// Middleware pour vérifier le token JWT //
///////////////////////////////////////////
// Verify Admin & User Token
const verifyAdminAndUserTokens = (req, res, next) => {
  const adminToken =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  const userToken =
    req.headers["x-user-authorization"] &&
    req.headers["x-user-authorization"].split(" ")[1]; // Correction ici

  if (!adminToken || !userToken) {
    return res.status(401).send("Accès refusé, tokens manquants.");
  }

  // Vérification du token admin
  jwt.verify(adminToken, process.env.ADMIN_TOKEN_SECRET, (err, admin) => {
    if (err) return res.status(403).send("Token admin invalide.");

    // Vérification du token utilisateur
    jwt.verify(userToken, process.env.USER_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Token utilisateur invalide.");

      // Ajout des infos admin et user à la requête
      req.admin = admin;
      req.user = user;

      // Passer au middleware suivant ou au route handler
      next();
    });
  });
};

// Verify Admin Token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).send("Accès refusé, aucun token admin fourni.");

  jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (err, admin) => {
    if (err) return res.status(403).send("Token & admin & invalide.");
    req.admin = admin;
    next();
  });
};

// Verify User Token
const verifyUserToken = (req, res, next) => {
  const token = req.headers["x-user-authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send("Accès refusé, aucun token utilisateur fourni.");

  jwt.verify(token, process.env.USER_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token utilisateur invalide.");
    req.user = user;
    next();
  });
};

// Générer un token admin
const generateAdminToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.ADMIN_TOKEN_SECRET,
    { expiresIn: "1h" },
  );
};

// Générer un token utilisateur
const generateUserToken = (user) => {
  return jwt.sign(
    { id: user._id, role: "user" },
    process.env.USER_TOKEN_SECRET,
    { expiresIn: "1h" },
  );
};

/**************
/ 
/  PERSONNES
/ 
*/ ////////////

///////////////////////////////////////
// Route pour lister les utilisateur //
///////////////////////////////////////

app.get("/personnes", verifyAdminToken, async (req, res) => {
  try {
    const personnes = await Personne.find({}).sort({ createdAd: 1 });

    return res.status(200).json({
      status: "success",
      message: "Utilisateurs récupérés avec succès!",
      personnes,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

///////////////////////////////////////////////
// Route pour inscrire un nouvel utilisateur //
///////////////////////////////////////////////

app.post("/personnes", verifyAdminToken, async (req, res) => {
  const { nom, prenom, numero } = req.body;

  const nomRegex = /^[A-Z][a-zA-Z]+$/;
  const prenomRegex = /^[A-Z][a-zA-Z]+$/;
  const numeroRegex = /^[0-9]{10}$/;

  if (!nom || !prenom || !numero) {
    return res.status(400).json({
      status: "error",
      message: "Tous les champs (nom, prenom, numero) sont requis",
    });
  }

  if (!nomRegex.test(nom)) {
    return res.status(400).json({
      status: "error",
      message:
        "Le nom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!prenomRegex.test(prenom)) {
    return res.status(400).json({
      status: "error",
      message:
        "Le prénom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!numeroRegex.test(numero)) {
    return res.status(400).json({
      status: "error",
      message: "Le numéro doit contenir exactement 10 chiffres",
    });
  }

  try {
    const utilisateur = await Personne.findOne({ nom, prenom });

    if (utilisateur) {
      return res.status(409).json({
        status: "error",
        message: "L'utilisateur existe déjà",
      });
    }

    const personne = new Personne({ nom, prenom, numero });
    await personne.save();

    return res.status(201).json({
      status: "success",
      message: "Utilisateur inscrit avec succès",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Erreur serveur",
      error: err.message,
    });
  }
});

////////////////////////////////////////////////////
// Route pour modifier les informations du compte //
////////////////////////////////////////////////////

app.put("/personnes", verifyAdminAndUserTokens, async (req, res) => {
  const { nom, prenom, numero } = req.body;

  const nomRegex = /^[A-Z][a-zA-Z]+$/;
  const prenomRegex = /^[A-Z][a-zA-Z]+$/;
  const numeroRegex = /^[0-9]{10}$/;

  if (!nom || !prenom || !numero) {
    return res.status(400).json({
      status: "error",
      message: "Tous les champs (nom, prenom, numero) sont requis",
    });
  }

  if (!nomRegex.test(nom)) {
    return res.status(400).json({
      status: "error",
      message:
        "Le nom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!prenomRegex.test(prenom)) {
    return res.status(400).json({
      status: "error",
      message:
        "Le prénom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!numeroRegex.test(numero)) {
    return res.status(400).json({
      status: "error",
      message: "Le numéro doit contenir exactement 10 chiffres",
    });
  }

  try {
    const id = req.user.id;

    const utilisateurExist = await Personne.findOne({ nom, prenom, numero });

    if (utilisateurExist && utilisateurExist._id.toString() !== id) {
      return res.status(409).json({
        status: "error",
        message: "Un utilisateur avec ces informations existe déjà.",
      });
    }

    const updatedPersonne = await Personne.findByIdAndUpdate(
      id,
      { nom, prenom, numero },
      { new: true },
    );

    if (updatedPersonne) {
      return res.status(200).json({
        status: "success",
        message: "Informations modifiées avec succès",
        personne: updatedPersonne,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Utilisateur non trouvé",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Erreur serveur lors de la modification des informations",
      error: err.message,
    });
  }
});

////////////////////////////////////
// Route pour supprimer le compte //
////////////////////////////////////

app.delete("/personnes", verifyAdminAndUserTokens, async (req, res) => {
  try {
    const id = req.user.id;

    const utilisateur = await Personne.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const notesExist = await Note.exists({ id_personne: id });
    if (notesExist) {
      await Note.deleteMany({ id_personne: id });
    }

    await Personne.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Compte et notes associées supprimés avec succès",
    });
  } catch (err) {
    console.error("Erreur lors de la suppression du compte:", err);

    return res.status(500).json({
      error: "Erreur serveur lors de la suppression du compte",
      details: err.message,
    });
  }
});

/**************
/ 
/  CONNEXION
/ 
*/ ////////////

//////////////////////
// Route pour login //
//////////////////////

app.post("/login", async (req, res) => {
  try {
    const { identifiant, motdepasse } = req.body;

    if (!identifiant || !motdepasse) {
      return res.status(400).json({
        status: "error",
        message: "Tous les champs (identifiant, mot de passe) sont requis",
      });
    }

    if (motdepasse.length !== 10) {
      return res.status(400).json({
        status: "error",
        message: "Mot de passe incomplet",
      });
    }

    const [nom, prenom] = identifiant.split(/(?=[A-Z])/);

    const utilisateur = await Personne.findOne({ nom, prenom, numero: motdepasse });

    if (!utilisateur) {
      return res.status(401).json({
        status: "error",
        message: "Identifiant incorrect",
      });
    }

    if (utilisateur.numero === motdepasse) {
      if (utilisateur.isAdmin) {
        accessToken = generateAdminToken(utilisateur);
      } else {
        accessToken = generateUserToken(utilisateur);
      }

      return res.status(200).json({
        status: "success",
        message: "Connexion réussie",
        data: { accessToken },
        module: utilisateur.isAdmin,
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: "Mot de passe incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

/************
/ 
/     NOTES
/  
*/ //////////

/////////////////////////////////////////////////////////
// Route pour lister toutes les notes d'un utilisateur //
/////////////////////////////////////////////////////////

app.get("/notes", verifyUserToken, async (req, res) => {
  try {
    const id = req.user.id;

    const utilisateur = await Personne.findById(id);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const notes = await Note.find({ id_personne: req.user.id });

    if (notes.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Aucune note trouvée pour cet utilisateur.",
        notes: [],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notes récupérées avec succès.",
      notes,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la récupération des notes.",
      error: err.message,
    });
  }
});

///////////////////////////////
// Route pour créer une note //
///////////////////////////////

app.post("/notes", verifyAdminAndUserTokens, async (req, res) => {
  const { titre, contenu } = req.body;

  if (!titre || !contenu) {
    return res.status(400).json({
      status: "error",
      message: "Le titre et le contenu sont requis.",
    });
  }

  const regex = new RegExp(`^${titre}( \\(\\d+\\))?$`, "i");

  try {
    const existingNotes = await Note.find({
      id_personne: req.user.id,
      titre: regex,
    });

    let titreNote =
      existingNotes.length > 0 ? `${titre} (${existingNotes.length})` : titre;

    const notes = await Note.find({ id_personne: req.user.id });

    const totalSize = notes.reduce(
      (acc, note) => acc + Buffer.byteLength(note.contenu, "utf8"),
      0,
    );

    const newNoteSize = Buffer.byteLength(contenu, "utf8");

    const MAX_NOTE_SIZE = 1024;
    const MAX_TOTAL_SIZE = 10 * 1024;

    if (newNoteSize > MAX_NOTE_SIZE) {
      return res.status(413).json({
        status: "error",
        error: "La taille du fichier excède la limite autorisée de 1 Ko.",
      });
    }

    if (totalSize + newNoteSize > MAX_TOTAL_SIZE) {
      return res.status(413).json({
        status: "error",
        error:
          "La taille totale des notes dépasse la limite autorisée de 10 Ko.",
      });
    }

    const note = new Note({
      id_personne: req.user.id,
      titre: titreNote,
      contenu: contenu,
    });

    await note.save();

    return res.status(201).json({
      status: "success",
      message: "Note créée avec succès.",
      note,
    });
  } catch (err) {
    console.error("Erreur interne du serveur :", err);

    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la création de la note.",
      error: err.message,
    });
  }
});

//////////////////////////////////////////////////////
// Route pour remise à zéro de l'espace de stockage //
//////////////////////////////////////////////////////

app.delete("/notes", verifyAdminAndUserTokens, async (req, res) => {
  try {
    const notes = await Note.find({ id_personne: req.user.id });

    if (!notes.length) {
      return res
        .status(404)
        .json({ error: "Aucune note trouvée pour l'utilisateur" });
    }

    await Note.deleteMany({ id_personne: req.user.id });

    return res
      .status(200)
      .json({ message: "Toutes les notes ont été supprimées" });
  } catch (err) {
    return res
      .status(500)
      .json({
        error: "Erreur serveur lors de la suppression des notes",
        details: err.message,
      });
  }
});

//////////////////////////////
// Route pour lire une note //
//////////////////////////////

app.get("/notes/:id", verifyAdminAndUserTokens, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).populate("id_personne");
    if (!note) {
      return res.status(404).json({
        status: "error",
        error: "Note non trouvée",
      });
    }

    if (note.id_personne._id.toString() !== req.user.id) {
      return res.status(403).json({
        status: "error",
        error: "Accès non autorisé",
      });
    }

    return res.status(200).json({
      status: "success",
      data: note,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
});

//////////////////////////////////////////////
// Route pour modifier le statut d'une note //
//////////////////////////////////////////////

app.patch("/notes/:noteId", verifyUserToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { status } = req.body;

    const validStatuses = ["attente", "accepter", "refuser", "terminer"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message:
          "Statut non valide. Statuts acceptés : attente, accepter, refuser, terminer.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        status: "error",
        message: "ID de note non valide.",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { status },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({
        status: "error",
        message: "Note non trouvée.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Statut mis à jour avec succès.",
      note: status,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la mise à jour.",
      error: error.message,
    });
  }
});

///////////////////////////////////
// Route pour supprimer une note //
///////////////////////////////////

app.delete("/notes/:id", verifyAdminAndUserTokens, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID de note non valide.",
      });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note non trouvée.",
      });
    }

    if (note.id_personne.toString() !== req.user.id) {
      return res.status(403).json({
        status: "error",
        message: "Accès non autorisé.",
      });
    }

    await Note.deleteOne({ _id: id });
    return res.status(200).json({
      status: "success",
      message: "Note supprimée avec succès.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la suppression.",
      error: err.message,
    });
  }
});

/**************
/ 
/   LANCEMENT DU SERVEUR
/ 
*/ ////////////

app.listen(port, "0.0.0.0", () => {
  //  console.log('Serveur lancé sur le port 4000');
});

/**EOF */

module.exports = app;
