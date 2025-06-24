const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const mongoDB = process.env.MONGODB;

const Personne = require("./models/Personne");
const Note = require("./models/Note");

const app = express();

app.use(cors());

const port = 4000;

app.use(express.json());

  ///////////////////////////
 // Configuration swagger //
///////////////////////////

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de BLOCNOTE",
      version: "1.0.0",
      description: "Documentation de l'API pour l'application BLOCNOTE",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /////////////////
 // Page index ///
/////////////////

/**
 * @swagger
 * /:
 *  get:
 *  summary: Page index - informations relatives à l'application
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 */

app.get("/", (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const versions = {
    node: process.version, // Version de Node.js
    express: require('express/package.json').version, // Version d'Express
    mongoose: require('mongoose/package.json').version, // Version de Mongoose
    dotenv: require('dotenv/package.json').version, // Version de Dotenv
    cors: require('cors/package.json').version // Version de CORS
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

/*************
/  
/   BLOCNOTE
/
*////////////

  /////////////////////////
 // Connexion à MongoDB //
/////////////////////////

mongoose
  .connect(mongoDB, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

/***********************
/ 
/    AUTHENTIFICATION
/ 
*//////////////////////

  ///////////////////////////////////////////
 // Middleware pour vérifier le token JWT //
///////////////////////////////////////////

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/**************
/ 
/  PERSONNES
/ 
*/////////////

  ///////////////////////////////////////
 // Route pour lister les utilisateur //
///////////////////////////////////////
/**
 * @swagger
 * /personnes:
 *  get:
 *    summary: Lister toutes les utilisateurs
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_personne:
 *                type: number
 *    responses:
 *      200:
 *        description: Utilisateurs récupérées avec succès.
 *      404:
 *        description: Utilisateur non trouvé
 *      500:
 *        description: Erreur lors de la récupération des notes.
 */
app.get("/personnes", authenticateToken, async (req, res) => {
  
  try {

    const personnes = await Personne.find({}).sort({ createdAd : 1 });

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

/**
 * @swagger
 * /personnes:
 *  post:
 *    summary: Créer un utilisateur
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nom:
 *                type: string
 *                description: Le nom de l'utilisateur (doit commencer par une majuscule).
 *              prenom:
 *                type: string
 *                description: Le prénom de l'utilisateur (doit commencer par une majuscule).
 *              numero:
 *                type: string
 *                description: Le numéro de téléphone de l'utilisateur (doit contenir exactement 10 chiffres).
 *            required:
 *              - nom
 *              - prenom
 *              - numero
 *        example:
 *          nom: "Dupont"
 *          prenom: "Jean"
 *          numero: "0123456789"
 *    responses:
 *      201:
 *        description: Utilisateur inscrit avec succès.
 *      400:
 *        description: |
 *          - Tous les champs (nom, prenom, numero) sont requis.\n
 *          - Le nom doit commencer par une majuscule et ne contenir que des lettres.
 *          - Le prénom doit commencer par une majuscule et ne contenir que des lettres.
 *          - Le numéro doit contenir exactement 10 chiffres.
 *      409:
 *        description: L'utilisateur existe déjà.
 *      500:
 *        description: Erreur serveur.
 */

app.post("/personnes", async (req, res) => {
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
      message: "Le nom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!prenomRegex.test(prenom)) {
    return res.status(400).json({
      status: "error",
      message: "Le prénom doit commencer par une majuscule et ne contenir que des lettres",
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

/**
 * @swagger
 * /personnes:
 *  put:
 *    summary:  Modifier les informations de connexion
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nom:
 *                type: string
 *              prenom:
 *                type: string
 *              numero:
 *                type: string
 *    responses:
 *      200:  
 *        description:  Informations modifiées avec succès
 *      400:  
 *        description: |
 *          - Tous les champs (nom, prenom, numero) sont requis
 *          - Le nom doit commencer par une majuscule et ne contenir que des lettres
 *          - Le prénom doit commencer par une majuscule et ne contenir que des lettres
 *          - Le numéro doit contenir exactement 10 chiffres
 *      404:  
 *        description: Utilisateur non trouvé
 *      409:  
 *        description: Un utilisateur avec ces informations existe déjà.
 *      500:  
 *        description: Erreur serveur lors de la modification des informations
 */

app.put("/personnes", authenticateToken, async (req, res) => {
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
      message: "Le nom doit commencer par une majuscule et ne contenir que des lettres",
    });
  }

  if (!prenomRegex.test(prenom)) {
    return res.status(400).json({
      status: "error",
      message: "Le prénom doit commencer par une majuscule et ne contenir que des lettres",
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
      { new: true }
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

/**
 * @swagger
 * /personnes:
 *  delete:
 *    summary: Supprimer un compte utilisateur
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *    responses:
 *      200:
 *        description:  Compte et notes associées supprimés avec succès
 *      404:
 *        description:  Utilisateur non trouvé
 *      500:
 *        description:  Erreur serveur lors de la suppression du compte
 */

app.delete("/personnes", authenticateToken, async (req, res) => {
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
*/////////////

  //////////////////////
 // Route pour login //
//////////////////////

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Connexion compte utilisateur
 *    tags: [Personnes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              identifiant:
 *                type: string
 *              motdepasse:
 *                type: string
 *    responses:
 *      200:
 *        description: Connexion réussie
 *      400:
 *        description:
 *          - Tous les champs (nom, prenom, numero) sont requis
 *          - Mot de passe incomplet
 *      401:
 *        description: |
 *          - Identifiant incorrect
 *          - Mot de passe incorrect
 *      500:
 *        description: Erreur serveur
 */

app.post("/login", async (req, res) => {
  try {
    const { identifiant, motdepasse } = req.body;

    if (!identifiant || !motdepasse) {
      return res.status(400).json({
        status: "error",
        message: "Tous les champs (nom, prenom, numero) sont requis",
      });
    }

    if (motdepasse.length > 10 || motdepasse.length < 10) {
      return res.status(400).json({
        status: "error",
        message: "Mot de passe incomplet",
      })
    }

    const [nom, prenom] = identifiant.split(/(?=[A-Z])/);

    const utilisateur = await Personne.findOne({ nom, prenom });

    if (!utilisateur) {
      return res.status(401).json({
        status: "error",
        message: "Identifiant incorrect",
      });
    }

    if (utilisateur.numero === motdepasse) {

      const accessToken = jwt.sign({ id: utilisateur._id }, jwtSecret, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        status: "success",
        message: "Connexion réussie",
        data: { accessToken },
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: "Mot de passe incorrect",
      });
    }
  } catch (error) {
    console.error(error);
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
*///////////

  /////////////////////////////////////////////////////////
 // Route pour lister toutes les notes d'un utilisateur //
/////////////////////////////////////////////////////////

/**
 * @swagger
 * /notes/:id_personne:
 *  get:
 *    summary: Lister toutes les notes d'un utilisateur
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_personne:
 *                type: number
 *    responses:
 *      200:
 *        description: |
 *          - Aucune note trouvée pour cet utilisateur.
 *          - Notes récupérées avec succès.
 *      404:
 *        description: Utilisateur non trouvé
 *      500:
 *        description: Erreur lors de la récupération des notes.
 */
app.get("/notes", authenticateToken, async (req, res) => {
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
/**
 * @swagger
 * /notes:
 *  post:
 *    summary: Créer une note
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              titre:
 *                type: string
 *              contenu:
 *                type: string
 *    responses:
 *      201:
 *        description: Note créée avec succès.
 *      400:
 *        description: Le titre et le contenu sont requis.
 *      413:
 *        description: |
 *          - La taille du fichier excède la limite autorisée de 1 Ko.
 *          - La taille totale des notes dépasse la limite autorisée de 10 Ko.
 *      500:
 *        description: Erreur lors de la création de la note.
 */
app.post("/notes", authenticateToken, async (req, res) => {
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

    let titreNote = existingNotes.length > 0 ? `${titre} (${existingNotes.length})` : titre;

    const notes = await Note.find({ id_personne: req.user.id });

    const totalSize = notes.reduce(
      (acc, note) => acc + Buffer.byteLength(note.contenu, "utf8"),
      0
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
        error: "La taille totale des notes dépasse la limite autorisée de 10 Ko.",
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
/**
 * @swagger
 * /notes/:id_personne:
 *  delete:
 *    summary: RAZ de l'espace de stockage de l'utilisateur
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_personne:
 *                type: number
 *    responses:
 *      200:
 *        description: Toutes les notes ont été supprimées
 *      404:
 *        description: Aucune note trouvée pour l'utilisateur
 *      500:
 *        description: Erreur serveur lors de la suppression des notes
 */
app.delete("/notes", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ id_personne: req.user.id });

    if (!notes.length) {
      return res.status(404).json({ error: "Aucune note trouvée pour l'utilisateur" });
    }

    await Note.deleteMany({ id_personne: req.user.id });

    return res.status(200).json({ message: "Toutes les notes ont été supprimées" });
  } catch (err) {

    return res.status(500).json({ error: "Erreur serveur lors de la suppression des notes", details: err.message });
  }
});

  //////////////////////////////
 // Route pour lire une note //
//////////////////////////////
/**
 * @swagger
 * /notes/:id_note:
 *  get:
 *    summary:  Lire une note
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id_note:
 *                type: number
 *    responses:
 *      200:
 *        description:  success
 *      400:
 *        description:  error
 *      403:
 *        description:  Accès non autorisé
 *      404:
 *        description:  Note non trouvée
 */
app.get("/notes/:id", authenticateToken, async (req, res) => {
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
/**
 * @swagger
 * /notes/:noteId:
 *  patch:
 *    summary: Modifier le status d'une note
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              noteId:
 *                type: number
 *              status:
 *                type: string
 *    responses:
 *      200:
 *        description: Statut mis à jour avec succès.
 *      400:
 *        description:
 *          - Statut non valide. Statuts acceptés : attente, accepter, refuser, terminer.
 *          - ID de note non valide.
 *      404:
 *        description: Note non trouvée.
 *      500:
 *        description: Erreur lors de la mise à jour.
 */
app.patch('/notes/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    const { status } = req.body;

    const validStatuses = ['attente', 'accepter', 'refuser', 'terminer'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Statut non valide. Statuts acceptés : attente, accepter, refuser, terminer.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID de note non valide.',
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { status },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        status: 'error',
        message: 'Note non trouvée.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Statut mis à jour avec succès.',
      note: updatedNote,
    });
  } catch (error) {

    return res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour.',
      error: error.message,
    });
  }
});

  ///////////////////////////////////
 // Route pour supprimer une note //
///////////////////////////////////
/**
 * @swagger
 * /notes/:id:
 *  delete:
 *    summary: Supprimer une note
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *    responses:
 *      200:
 *        description: Note supprimée avec succès.
 *      400:
 *        description: ID de note non valide.
 *      403:
 *        description: Accès non autorisé.
 *      404:
 *        description: Note non trouvée.
 *      500:
 *        description: Erreur lors de la suppression.
 */
app.delete("/notes/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID de note non valide.',
      });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note non trouvée.',
      });
    }

    if (note.id_personne.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Accès non autorisé.',
      });
    }

    await Note.deleteOne({ _id: id });
    return res.status(200).json({
      status: 'success',
      message: 'Note supprimée avec succès.',
    });
  } catch (err) {

    return res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression.',
      error: err.message,
    });
  }
});

/**************
/ 
/   LANCEMENT DU SERVEUR
/ 
*/////////////

app.listen(4000, '0.0.0.0', () => {
  console.log('Serveur lancé sur le port 4000');
});

/**EOF */
