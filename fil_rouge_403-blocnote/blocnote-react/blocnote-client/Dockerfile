# Étape 1 : Utiliser une image de base Node.js avec un OS alpine linux pour la construction
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm i

# Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port sur lequel NGINX fonctionne
EXPOSE 8081

# Démarrer NGINX
#CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
