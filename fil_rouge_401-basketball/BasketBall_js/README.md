***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_js
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci un un site WEB statique utilisant HTML / CSS affichant des données provenant d'une API REST avec JavaScript.
- #### Schéma du site
    ```mermaid
    flowchart LR
        id1[(Database
        BD¹)]
        id2([JSON³])
        id3[[Client]]
        id1 <-- URL² --> id2 <-- HTTP⁴ --> id3
        Navigation <--> List_Joueurs
        subgraph joueurs [Joueurs]
        List_Joueurs <--> Details_Joueurs
        end
        Navigation <--> List_Equipes
        subgraph equipes [Equipes]
        List_Equipes <--> Details_Equipes
        end
        Details_Joueurs <--> Details_Equipes
        Details_Joueurs --> Navigation
        Details_Equipes --> Navigation
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[API]: Application Programming Interface
*[REST]: REpresentational State Transfert
#
*¹ BD: Base de donnée*
*² URL: Uniform Resource Language*
*³ JSON: JavaScript Object Notation*
*⁴ HTTP: Hyper Text Tranfert Protocol*
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023