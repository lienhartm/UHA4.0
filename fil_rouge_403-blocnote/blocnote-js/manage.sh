#!/bin/bash

# Fonction pour afficher un message de début
function print_start_message {
    echo "=== Début du nettoyage et de la gestion de Docker ==="
}

# Fonction pour afficher un message de fin
function print_end_message {
    echo "=== Nettoyage et gestion de Docker terminés ==="
}

# Fonction pour vérifier si Docker est installé
function check_docker {
    if ! command -v sudo docker &>/dev/null; then
        echo "Docker n'est pas installé. Veuillez installer Docker pour utiliser ce script."
        exit 1
    fi
}

# Fonction pour nettoyer Docker
function docker_clean {
    echo "Arrêt des conteneurs en cours..."
    sudo docker stop $(sudo docker ps -aq) >/dev/null 2>&1 || true

    echo "Suppression des conteneurs en cours..."
    sudo docker rm $(sudo docker ps -aq) >/dev/null 2>&1 || true

    echo "Suppression des images en cours..."
    sudo docker rmi $(sudo docker images -q) >/dev/null 2>&1 || true

    echo "Suppression des volumes en cours..."
    sudo docker volume rm $(sudo docker volume ls -q) >/dev/null 2>&1 || true

    echo "Suppression des réseaux non utilisés en cours..."
    sudo docker network prune -f >/dev/null 2>&1 || true

    echo "Suppression des builds intermédiaires en cours..."
    sudo docker builder prune -a -f >/dev/null 2>&1 || true

    echo "Nettoyage Docker terminé."
}

# Fonction pour construire et exécuter les conteneurs
function docker_build_and_run {
    echo "Construction des images Docker en cours..."
    if sudo docker build -t blocnote .; then
        echo "Image Docker construite avec succès."
    else
        echo "Échec de la construction de l'image Docker."
        exit 1
    fi

    echo "Démarrage des conteneurs Docker en cours..."
    if sudo docker run -d -p 4000:4000 blocnote; then
        echo "Conteneur Docker démarré avec succès en arrière-plan."
    else
        echo "Échec du démarrage du conteneur Docker."
        exit 1
    fi
}

# Exécution des fonctions
print_start_message
check_docker
docker_clean
docker_build_and_run
print_end_message

