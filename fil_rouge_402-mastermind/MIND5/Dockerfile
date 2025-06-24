# Étape 1 : Construire l'application Java Spring Boot
FROM maven:3.8.4-openjdk-17 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier Pom.xml (Projet Object Model) de Maven dans le répertoire de travail
COPY pom.xml .

# Copier le code source de l'application
COPY src ./src

# Construire l'application avec Maven
RUN mvn clean package -DskipTests

# Étape 2 : Créer l'image finale avec OpenJDK et l'application Java construite
FROM openjdk:17-jdk-alpine

# Définir le répertoire de travail pour l'application Java
WORKDIR /app

# Copier le fichier WAR empaqueté depuis l'étape de construction Maven vers le répertoire actuel
COPY --from=builder /app/target/*.war app.war

# Exposer le port 8080 vers le monde extérieur
EXPOSE 8080

# Commande pour exécuter l'application Java Spring Boot
CMD ["java", "-jar", "app.war"]
