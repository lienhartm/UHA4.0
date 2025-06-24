const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("./server");
const mongoose = require("mongoose");
const Personne = require("./models/Personne");
const Note = require("./models/Note");
require('dotenv').config();

const mongoDB = process.env.MONGODB;
const adminSecret = process.env.ADMIN_TOKEN_SECRET;
const userSecret = process.env.USER_TOKEN_SECRET;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  const firstTwoPersons = await Personne.find().sort({ _id: 1 }).limit(2);

  if (firstTwoPersons.length === 2) {
    await Personne.deleteMany({ _id: { $nin: [firstTwoPersons[0]._id, firstTwoPersons[1]._id] } });
  }

});

///////////////////////////////////////////////
//                                           //
//   POST /login                             //
//                                           //
//   L'utilisateur se connecte à son compte  //
//                                           //
///////////////////////////////////////////////

describe("POST /login", () => {

  Note.deleteMany({});

  it('devrait faire quelque chose (à compléter)', async () => {
  });

    //  1.
    // test de connection avec champs de formulaire vide
    //
  it("devrait retourner une erreur 400 si les champs sont manquants", async () => {
    const response = await request(app).post("/login").send({
      identifiant: "",
      motdepasse: "",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Tous les champs (identifiant, mot de passe) sont requis",
    });

    
  });

    //  2.
    // test de connection pour un mot de passe n'atteignant pas dix caractères
    //
  it("devrait retourner une erreur 400 si le mot de passe n'a pas 10 caractères", async () => {
    const response = await request(app).post("/login").send({
      identifiant: "DoeJohn",
      motdepasse: "123456789",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Mot de passe incomplet",
    });
  });

    //  3.
    //  test de connection avec identifiant incorrect
    //
  it("devrait retourner une erreur 401 si l'identifiant est incorrect", async () => {

    const response = await request(app).post("/login").send({
      identifiant: "DoeJane",
      motdepasse: "1234567890",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      status: "error",
      message: "Identifiant incorrect",
    });
  });

    //  4.
    //  test de connection avec mot de passe incorrect
    //
  it("devrait retourner une erreur 401 si le mot de passe est incorrect", async () => {

    const response = await request(app).post("/login").send({
      identifiant: "AdminRoot",
      motdepasse: "wrongpassword",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Mot de passe incomplet",
    });
  });

    //  5.
    //  test de connexion reussi
    //
  it("devrait retourner un token d'accès si la connexion est réussie", async () => {

    const response = await request(app).post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Connexion réussie",
        data: {
          accessToken: expect.any(String),
        },
        module: true,
      }),
    );
  });
});

///////////////////////////////
//                           //
//    POST /notes            //
//                           //
//        créer des notes    //
//                           //
///////////////////////////////

describe('POST /notes', () => {

    //  6.
    //  test de création de note avec succès
    //
  it('devrait créer une note avec succès si les données sont valides', async () => {
    const noteContent = 'Contenu de la note';
    const noteTitle = 'Titre de la note';
  
    // Connexion en tant qu'admin
    const adminLogin = await request(app)
      .post("/login")
      .send({
        identifiant: "AdminRoot",
        motdepasse: "0000000000",
      });
  
    const adminToken = adminLogin.body.data.accessToken;
  
    // Création d'une nouvelle personne
    const newUserResponse = await request(app)
      .post("/personnes")
      .set("Authorization", `Bearer ${adminToken}`) // Utiliser le token admin pour créer un utilisateur
      .send({
        nom: "Nom",
        prenom: "Prenom",
        numero: "0000000000", // Le mot de passe pour cet utilisateur
      });
  
    const newUser = newUserResponse.body.utilisateur;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;
  
    // Création d'une note pour la personne
    const response = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${adminToken}`) // Token admin pour les privilèges
      .set("X-User-Authorization", `Bearer ${userToken}`) // Token utilisateur pour les droits de cet utilisateur
      .send({
        id_personne: userLogin.body.id_personne, // ID de la personne créée
        titre: noteTitle,
        contenu: noteContent,
      });
  
    // Vérifications
    expect(response.status).toBe(201);

  });

    //  7.
    //  test si la note à bien été créée
    //
  it('test note bien créé avec titre `Titre de la note`', async () => {
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
      
    const userToken = userLogin.body.data.accessToken;

    const response = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    const firstNote = response.body.notes[0];

    expect(firstNote.titre).toContain('Titre de la note');

  });
  
  //  8.
  //    test de creation de note avec contenu manquant
  //
  it('devrait retourner une erreur si les données sont manquantes', async () => {
    const noteContent = 'Contenu de la note';
    const noteTitle = 'Titre de la note';
  
    // Connexion en tant qu'admin
    const adminLogin = await request(app)
      .post("/login")
      .send({
        identifiant: "AdminRoot",
        motdepasse: "0000000000",
      });
  
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;
  
    // Création d'une note pour la personne
    const response = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${adminToken}`) // Token admin pour les privilèges
      .set("X-User-Authorization", `Bearer ${userToken}`) // Token utilisateur pour les droits de cet utilisateur
      .send({
        id_personne: userLogin.body.id_personne, // ID de la personne créée
        titre: noteTitle,
        contenu: "",
      });

    expect(response.statusCode).toEqual(400);
    
  });

    //  9.
    //  test de creation de note avec un fichier de taille supérieur à 1024 ko
    //
  it('devrait retourner une erreur si la taille du fichier excède 1 Ko', async () => {
    const noteContent = 'a'.repeat(1025);
    const noteTitle = 'Titre de la note';

    // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });

    const adminToken = adminLogin.body.data.accessToken;

    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });

    const userToken = userLogin.body.data.accessToken;

    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-User-Authorization', `Bearer ${userToken}`)
      .send({
        id_personne: userLogin.body.id_personne, // ID de la personne créée
        titre: noteTitle,
        contenu: noteContent,
      });

    expect(res.statusCode).toEqual(413);
    expect(res.body).toHaveProperty('error', 'La taille du fichier excède la limite autorisée de 1 Ko.');
  });

    //  10.
    //  test de l'espace de stockage ne pouvant dépassé 10 ko
    //
  it('devrait retourner une erreur si la taille totale des notes dépasse 10 Ko', async () => {
    const noteContent = '#'.repeat(1020); // Contenu de la note qui prend beaucoup de place
    const noteTitle = 'Titre de la note';
  
    // Connexion en tant qu'admin
    const adminLogin = await request(app)
      .post("/login")
      .send({
        identifiant: "AdminRoot",
        motdepasse: "0000000000",
      });
  
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;
  
    let res; // Déclaration de la variable pour stocker la réponse
  
    for (let x = 0; x < 12; x++) { // Corrigé pour utiliser 'let'
      res = await request(app)
        .post('/notes')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('X-User-Authorization', `Bearer ${userToken}`)
        .send({
          id_personne: userLogin.body.id_personne, // ID de la personne créée
          titre: noteTitle,
          contenu: noteContent,
        });
    }
  
    // Vérifications après la boucle
    expect(res.statusCode).toEqual(413);
    expect(res.body).toHaveProperty('error', 'La taille totale des notes dépasse la limite autorisée de 10 Ko.');
  });
});

//////////////////////////////////////////
//                                      //
//  PATCH /notes                        //
//                                      //
//    Modififier le status d'une note   //
//                                      //
//////////////////////////////////////////

describe("PATCH /notes/:noteId", () => {

    //  11.
    //  met à jour le status d'une note
    //
  it("devrait mettre à jour le statut d'une note avec succès", async () => {

    // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;

    const notesResponse = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);
    const firstNoteId = notesResponse.body.notes[0]._id;
  
    const response = await request(app)
      .patch(`/notes/${firstNoteId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-User-Authorization', `Bearer ${userToken}`)
      .send({ status: "accepter" });

    expect(response.status).toBe(200);

  });

    //  12.
    //  test si le status de la note à bien été modifié
    //
  it('test note avec status bien modifié `Accepter`', async () => {
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
      
    const userToken = userLogin.body.data.accessToken;

    const response = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    const firstNote = response.body.notes[0];

    expect(firstNote.status).toContain('accepter');

  });

    //  13.
    //  test de modification avec status invalide
    //
  it("devrait renvoyer une erreur 400 si le statut est invalide", async () => {

    // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;

    const notesResponse = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);
    const firstNoteId = notesResponse.body.notes[0]._id;
  
    const response = await request(app)
      .patch(`/notes/${firstNoteId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-User-Authorization', `Bearer ${userToken}`)
      .send({ status: "encours" });

    expect(response.status).toBe(400);

  });

    //  14.
    //  test de modification de note avec id de note invalide
    //
  it("devrait renvoyer une erreur 400 si l'ID de note est non valide", async () => {
    // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;

    const firstNoteId = "000000";
  
    const response = await request(app)
      .patch(`/notes/${firstNoteId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-User-Authorization', `Bearer ${userToken}`)
      .send({ status: "accepter" });

    expect(response.status).toBe(400);

  });

    //  15.
    //  test pour renvoie de id non trouvé
    //
  test("devrait renvoyer une erreur 404 si la note n'est pas trouvée", async () => {

      // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
  
    const userToken = userLogin.body.data.accessToken;

    const firstNoteId = '671a5720acd4c04c9ec89733';
  
    const response = await request(app)
      .patch(`/notes/${firstNoteId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-User-Authorization', `Bearer ${userToken}`)
      .send({ status: "accepter" });

    expect(response.status).toBe(404);

  });
});

////////////////////////////////////////////////
//                                            //
//   GET /notes                               //
//                                            //
//  Lire toutes les notes d'un utilisateur    //
//                                            //
////////////////////////////////////////////////

describe("GET /notes", () => {
    
    //  16.
    // Test avec token manquant
    //
  it("devrait renvoyer 403 si le token est manquant", async () => {

    // Connexion en tant qu'admin
    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
      
    const userToken = "";

    const notesResponse = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    expect(notesResponse.status).toBe(401);
  });

    //  17.
    // Test avec token invalide
    //
  test("devrait renvoyer 403 si le token est invalide", async () => {

    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;

      
    const userToken = '671a5f20eed2131f3fbdcf10';

    const notesResponse = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    // Vérifier le statut de la réponse
    expect(notesResponse.status).toBe(403);

  });

  //  18.
  // Test pour récupérer les notes d'un dossier
  //
  test("devrait récupérer les notes pour un utilisateur", async () => {

    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
      
    const userToken = userLogin.body.data.accessToken;

    const notesResponse = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    // Vérifier le statut de la réponse
    expect(notesResponse.status).toBe(200);

  });

    //  19.
    //  test pour verifier que la numérotation des notes est bien faites
    //
  test("devrait trouvée que la numérotation des notes à bien été effectuée", async () => {

    const adminLogin = await request(app)
    .post("/login")
    .send({
      identifiant: "AdminRoot",
      motdepasse: "0000000000",
    });
    
    const adminToken = adminLogin.body.data.accessToken;
  
    // Connexion en tant que nouvel utilisateur
    const userLogin = await request(app)
      .post("/login")
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        identifiant: `NomPrenom`, // Combinaison du nom et prénom comme identifiant
        motdepasse: "0000000000", // Mot de passe utilisé lors de la création
      });
      
    const userToken = userLogin.body.data.accessToken;

    const response = await request(app)
    .get(`/notes`)
    .set('Authorization', `Bearer ${adminToken}`)
    .set('X-User-Authorization', `Bearer ${userToken}`);

    const lastNote = response.body.notes[response.body.notes.length - 1]; // Assurez-vous que le format de la réponse est correct
    await Note.deleteMany({});
    // Vérification que le contenu contient le nombre 10
    expect(lastNote.titre).toContain('10');
    await Note.deleteMany({});
  });
});
