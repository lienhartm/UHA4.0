# FIL ROUGE 4.0.3

### BIENVENUE EN 403, votre dernière année à l'UHA 4.0 !

## Objectifs :

Le but du fil rouge 403 est de mettre en œuvre l'ensemble des compétences acquises lors des années précédentes et de vous apprendre les bases de nouvelles compétences comme le métier de Dev Ops, Scrum Master ou Testeur.

Vous ne deviendrez pas des experts sur ces nouvelles compétences mais vous aurez des acquis solides pour les approfondir plus tard dans votre carrière !


L'objectif est donc un développement full stack de bout en bout en respectant les normes de qualité, avec de la documentation, des tests, de la validation et du déploiement d'une application.

## Cahier des charges

- Le nom de projet est : **BlocNote**

- [Le GitLab Repository du projet BlocNote](https://git.uha4point0.fr/UHA40/fil-rouge-2024/4.0.3/blocnote/-/tree/develop?ref_type=heads)
- [Le dashboard JIRA du projet BlocNote](https://jira.uha4point0.fr/secure/Dashboard.jspa)
- [La documentation du projet sur Confluence](https://confluence.uha4point0.fr/pages/viewpage.action?pageId=192382241)

- Définition de l'application :

L'application à usage privé permet de créer des dossiers dans lesquels l'ont peut créer des fichier.
Les dossier sont sécurisé il faut pour cela les ouvrir à l'aide d'un identifiant et mot de passe.
L'identifiant est composé du nom et de l'objet du dossier.
Chaque fichier à une taille limite de 1 ko.
Chaque dossier à une taille limite de 10 ko.

La version mobile quand à elle permet d'ouvrir un dossier sécurisé et d'y lire les notes qui y sont contenu. Il est aussi possible de gérer le statut de celle-ci.

Pour cette démonstration un utilisateur est déjà créée mais ne permet pas la création ni la gérance d'autres utilisateurs.
Pour assurer la connection administrateur du projet:
- Identifant : *RootAdmin*
- Mot de passe : *0000000000*

## Interface de programmation

Voici une documentation de l'api utilisé pour l'application blocnote.

 | Requêtes | Chemins | Fonctions | Paramêtre | Auhtorisation | Body | Réponses | Mobile |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| POST | /personnes | s'inscrire une personne |  |  | {"nom":"Effel","prenom":"Gustave","numero":"1234512345"} | 201: Utilisateur inscrit avec succès<br>400: Tous les champs sont requis<br>409: L'utilisateur existe déjà<br>500: Erreur serveur |  |
| PUT | /personnes | modifier une personne |  | TOKEN | {"nom":"Effel","prenom":"Gustave","numero":"0000000000"} identique<br>{"nom":"Nom","prenom":"Prenom","numero":"0000000000"} existant | 200: Informations modifiées avec succès<br>400: Nom, prénom et numéro doivent être fournis<br>404: Utilisateur non trouvé<br>409: Un utilisateur avec ces informations existe déjà<br>500: Erreur serveur |  |
| DELETE | /personnes | supprimer une personne |  | TOKEN |  | 200: Compote et notes associées supprimés avec succès<br>404: Utilisateur non trouvé<br>500: Erreur serveur |  |
| POST | /login | se connecter |  | TOKEN | {"identifiant":"EffelGustave","motdepasse":"0000000000"} | 200: Connexion réussie<br>401: Identifiant incorrect<br>401: Mot de passe incorrect<br>500: Erreur serveur | * |
| POST | /notes | enregistrer une note |  | TOKEN | {"titre":"titre", "contenu":"contenu"} | 201: Note créée<br>400: Erreur<br>413: Taille > 1 ko<br>413: Stockage > 10 ko |  |
| GET | /notes | lire toutes les notes |  | TOKEN |  | 200: Aucune note trouvée pour cet utilisateur<br>200: Notes récupérées avec succès<br>500: Erreur Serveur | * |
| DELETE | /notes | supprimer toutes les notes |  | TOKEN |  | 200: Toutes les notes ont été supprimées<br>404: Aucune note trouvée<br>500: Erreur serveur |  |
| GET | /notes/id | lire une note | id | TOKEN |  | 200: succès<br>400: Erreur<br>403: Accès non autorisé<br>404: Note non trouvée |  |
| DELETE | /notes/id | supprimer une note | id | TOKEN |  | 200: Note supprimée avec succès<br>400: ID de note non valide<br>403: Accès non autorisé<br>404: Note non trouvé<br>500: Erreur lors de la suppression |  |
| PATCH | /notes/id | modifier le status d'une note | id | TOKEN | 	{ "status":"attente" } | 200: Status mis à jour avec succès<br>400: Status non valide<br>400: ID de note non valide<br>404: Note non trouvée<br>500: Erreur lors de la mise à jour | * |

## Base de donnée

La base de donnée est hébergé sur [MongoDB Atlas](https://www.mongodb.com/fr-fr).
> [Une ressource tutoriel pour bien commencer avec MongoDB Atlas](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)

La base de donnée de l'application BlocNote comprend deux collections :
- Personnes
- Notes

## Docker

Le projet BlocNote de la branche 'develop' est gérer par une pipeline qui assure le déploiement sur un serveur pour les versions :
- BlocNote-React :
    - build: blocnote-client
        - image: lienhartm/blocnote-react_client:latest
        - container_name: lienhartm-blocnote.react.client
    - build: blocnote-server
        - image: lienhartm/blocnote-react_server:latest
        - container_name: lienhartm-blocnote.react.server
- BlocNote-Mobile :
    - image: lienhartm/blocnote-mobile:latest
    - conteneur: lienhartm-blocnote.mobile

Pour assurer le job de publish dans la pipeline [Docker Hub](https://hub.docker.com/) est utilisé.

## Format, Syntax, Test

- Le formatage est assuré par [Prettier](https://prettier.io/) qui est inclus dans la pipeline.
- La vérification syntaxique est assuré par [Eslint](https://eslint.org/J) qui n'est pas inclus dans la pipeline pour la cause que sont intégration ne premettai pas la réussite du job.
- Les tests sont promulgués par [Jest](https://jestjs.io/) et supertest, et appliqués uniquement aux routes de l'API utilisé par la version mobile dont voici une documentation. 

| User Story | Objectif du test | Critères d'acceptances | Résultat attendu | Résultat réel |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| #1 /login | devrait renvoyer une erreur 400 si les champs sont manquants | Tous les champs (nom, prenom, numero) sont requis | 400 | 400 |
| #1 /login | devrait renvoyer une erreur 400 si le mot de passe est incomplet | Mot de passe incomplet | 400 | 400 |
| #1 /login | devrait renvoyer une erreur 401 si l\'identifiant est incorrect | Identifiant incorrect | 401 | 401 |
| #1 /login | devrait renvoyer une erreur 401 si le mot de passe est incorrect | Mot de passe incorrect | 401 | 401 |
| #1 /login | devrait valider pour une connexion réussie | Connexion réussie | 200 | 200 |
| #1 /login | devrait renvoyer une erreur 500 en cas d\'erreur serveur | Erreur serveur | 500 | 500 |
| #2 /notes | devrait renvoyer 403 si le token est manquant | / | 401 | 401 |
| #2 /notes | devrait renvoyer 403 si le token est invalide | / | 403 | 403 |
| #2 /notes | devrait renvoyer 403 si le token est expiré | / | 403 | 403 |
| #2 /notes | devrait récupérer les notes pour un utilisateur | Notes récupérées avec succès. | 200 | 200 |
| #2 /notes | devrait renvoyer 404 si l\'utilisateur n\'est pas trouvé | Utilisateur non trouvé | 404 | 404 |
| #2 /notes | devrait renvoyer un message si aucune note n\'est trouvée | Aucune note trouvée pour cet utilisateur. | 404 | 404 |
| #2 /notes | devrait renvoyer une erreur 500 en cas d\'erreur serveur | Erreur lors de la récupération des notes. | 500 | 500 |
| #3 /notes/:noteId | devrait mettre à jour le statut d\'une note avec succès | Statut mis à jour avec succès. | 200 | 200 |
| #3 /notes/:noteId | devrait renvoyer une erreur 400 si le statut est invalide | Statut non valide. Statuts acceptés : attente, accepter, refuser, terminer. | 400 | 400 |
| #3 /notes/:noteId | devrait renvoyer une erreur 400 si l\'ID de note est non valide | ID de note non valide. | 400 | 400 |
| #3 /notes/:noteId | devrait renvoyer une erreur 404 si la note n\'est pas trouvée | Note non trouvée. | 404 | 404 |
| #3 /notes/:noteId | devrait renvoyer une erreur 500 en cas d\'erreur de serveur | Erreur lors de la mise à jour. | 500 | 500 |

###### UHA 4.0 - FIL ROUGE 4.0.3 - BlocNote - LIENHART Michaël