# Stage 1: Build the Java Spring Boot application
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project Object Model (POM) file to the working directory
COPY pom.xml .

# Copy the application source code
COPY src ./src

# Build the application with Maven
RUN mvn clean package -DskipTests

# Stage 2: Build and run the Node.js Express application
FROM node:lts AS node_builder

# Set the working directory for the Node.js application
WORKDIR /app/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY public .

# Stage 3: Create the final image with OpenJDK and the built Java application
FROM openjdk:17-jdk-alpine

# Set the working directory for the Java application
WORKDIR /app

# Copy the packaged WAR file from the Maven builder stage to the current directory
COPY --from=builder /app/target/*.war app.war

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the Java Spring Boot application
CMD ["java", "-jar", "app.war"]
