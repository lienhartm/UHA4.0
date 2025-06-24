***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_htmlcss_iframe
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci un un site WEB statique utilisant que du HTML / CSS. L'utilisation de la balise `<iframe>` permet d'avoir une interactivité.
- #### Schéma du site
    ```mermaid
    flowchart LR
        Navigation <--> lists
        subgraph lists [Iframe Lists]
        List_Joueurs
        List_Equipes
        end
        subgraph details [Iframe Details]
        Details_Joueurs
        Details_Equipes
        end
        Details_Joueurs <--> Details_Equipes
        lists --> details
        details --> Navigation
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023