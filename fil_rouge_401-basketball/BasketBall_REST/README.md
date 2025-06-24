***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_phpsql
>##### Auteur : LIENHART Michaël
>##### Base de données : Basketball
#
- #### Description :
    Ceci une site WEB dynamique utilisant HTML / CSS pour la partie front et avec JavaScript pour effectuer les requête HTTP et l'affichage. Les données affichées proviennent de la base de donnée 'Basketball' et sont transmise par l'URL en utilisant PHP et SQL.
- #### Schéma du site
    ```mermaid
    flowchart LR
        subgraph API REST
        id1[(Database)]
        end
        id2([JSON¹])
        subgraph CLIENT
        id3[Navigateur]
        end
        id1 <-- URL² --> id2 <-- HTTP³ --> id3
    ```
    ###### Les point de terminaisons sont :
    - BasketBall_REST/joueurs.php
    - BasketBall_REST/equipes.php
    ###### Les requetes et leurs chemins
    | Chemin          | Methode | Description                   |
    | :-------------- | :-----: | ----------------------------: |
    | joueurs.php     | GET     | renvoie une liste de joueurs  |
    | equipes.php     | GET     | renvoie une liste d'équipes   |
    | joueurs.php?id= | GET     | renvoie un joueur             |
    | equipes.php?id= | GET     | renvoie une equipe            |
#
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[PHP]: Protocol Hyper Preprocessor
*[SQL]: Strutured Query Language
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023
