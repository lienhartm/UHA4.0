***
### DOCUMENTATION
***
>##### Thème : Basketball
>##### Auteur : LIENHART Michaël
#
- #### Installation avec LAMP [(voir)](LAMP.md)
- #### Installation avec XAMP [(voir)](XAMPP.md)
- #### Connexion à la partie admin
    Votre identifiant et mot de passe ne pourront être changer.

    **Identifiant : *root***
    
    **Mot de passe : *password***
- #### Configuration de la connexion à votre base de donnée [ici](../projet_basketball/Connection/mysql.php)
    Il vous suffit de modifier les valeurs des variables *username* et *password*  par votre identifiant et mot de passe de connexion.
- #### Première connexion
    Lors la première utilisation de l'application connectez vous en tant qu'admin avec les identifiant et mot de passe ci-dessus et créée [CREATE] la base de donnée et inséré si les données [INSERT] pour que l'utilisateur puisse admirer les données qui s'afficherons. Sans cela la base de donnée sera vide et rien s'affichera.
- #### Interaction de l'application
    **Partie CLIENT**
    - [Basketball] Renvoie à l'accueil du site
    - [Equipes] Affiche une liste des équipes qui renvoie les détails d'une équipes si l'on clique sur l'une d'elle.
    Il est possible de consulter les joueurs d'une l'équipe depuis les détails d'une équipe.
    - [Joueurs] Affiche une liste des joueurs qui renvoie les détails d'un joueur si l'on clique sur l'un d'eux.
    Il est possible de consulter l'équipe d'un joueur depuis les détails d'un joueur.
    ######
    **Partie ADMIN**
    - [Basketball] Donne une vue des tables de la base de donnée Basketball.
    - [DROP] Supprime la base de donnée.
    - [CREATE] Créée la base de donnée.
    - [INSERT] Insertion de la base de donnée.
    - [TRUNCATE] Efface les tables sans les Supprimé puis procéde aux insertions via l'API de l'UHA.
    ######
    Sur les onglets suivant il est possible d'ajouter , modifier et supprimer des données.
    - [Equipe] Table equipe
    - [Couleur] Table couleur
    - [Couleur_equipe] Table couleur_equipe
    - [Courriel] Table courriel
    - [Joueur] Table joueur
- #### Contenu du [dossier](ls)
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023
