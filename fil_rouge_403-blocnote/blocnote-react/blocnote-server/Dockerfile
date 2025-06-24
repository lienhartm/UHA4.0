# Utiliser une image Node.js comme image de base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm i

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port sur lequel le serveur Node.js fonctionne
EXPOSE ${PORT_SERVER}

# Démarrer le serveur Node.js
CMD ["npm", "start"]
