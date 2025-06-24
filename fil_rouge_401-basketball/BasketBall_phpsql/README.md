***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_phpsql
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci une site WEB dynamique utilisant HTML / CSS pour la partie front et avec PHP et SQL. Les données affichées proviennent de la base de donnée 'Basketball'.
- #### Schéma du site
    ```mermaid
    flowchart LR
        id1[(Database)]
        id2{Lists}
        id3{Details}
        id4[Joueurs]
        id5[Equipes]
        id1 --> id2
        id1 --> id3
        id2 --> id4
        id2 --> id5
        id3 <--> id4
        id3 <--> id5
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[PHP]: Protocol Hyper Preprocessor
*[SQL]: Strutured Query Language
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023