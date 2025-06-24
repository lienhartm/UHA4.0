***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_htmlcss
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci un un site WEB statique utilisant du HTML / CSS.
- #### Schéma du site
    ```mermaid
        flowchart LR
        Accueil <--> Lists_Joueurs <--> Details_Joueurs
        Accueil <--> Lists_Equipes <--> Details_Equipes
        Details_Equipes <--> Details_Joueurs
        Details_Joueurs --> Accueil
        Details_Equipes --> Accueil
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023