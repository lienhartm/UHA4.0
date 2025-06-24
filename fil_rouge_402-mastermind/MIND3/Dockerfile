# Use the official Maven image as a builder
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project Object Model (POM) file to the working directory
COPY pom.xml .
COPY src ./src

# Copy the application properties file to the working directory
COPY src/main/resources/application.properties src/main/resources/

# Build the application with Maven
RUN mvn clean package -DskipTests

# Use OpenJDK as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the packaged WAR file from the builder stage to the current directory
COPY --from=builder /app/target/*.war app.war

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.war"]

