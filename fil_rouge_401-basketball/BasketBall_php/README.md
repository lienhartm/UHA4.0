***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_php
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci un un site WEB utilisant les langages tel que PHP, HTML et CSS pour afficher des données depuis une API REST.
- #### Schéma du site
    ```mermaid
    flowchart LR
        id1[(Database
        BD¹)]
        id2([JSON³])
        id3[[Client]]
        id1 <-- URL² --> id2 <-- HTTP⁴ --> id3
        id4[Navigation]
        id5{Lists}
        id6{Details}
        id7[Joueurs]
        id8[Equipes]
        id4 <----> id5
        id7 <----> id5 <----> id8
        id7 <----> id6 <----> id8
        id6 <----> id4
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[PHP]: Protocol Hyper Processor
*[API]: Application Programing Interface
*[REST]: REpresentation State Transfert
#
*¹ BD: Base de donnée*
*² URL: Uniform Resource Language*
*³ JSON: JavaScript Object Notation*
*⁴ HTTP: Hyper Text Transfert Protocol*
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023