# Étape 1 : Utiliser une image de base Node.js
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Installer les dépendances du projet
RUN npm i cors dotenv express jsonwebtoken mongoose swagger-ui-express swagger-jsdoc

# Étape 4 : Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Étape 5 : Exposer le port sur lequel l'application Node.js fonctionne (ajuster selon ton projet)
EXPOSE 4000

# Étape 6 : Démarrer l'application
CMD ["node", "server.js"]