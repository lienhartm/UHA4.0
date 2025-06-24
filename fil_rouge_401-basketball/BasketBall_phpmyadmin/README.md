***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_phpmyadmin
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci une application WEB dynamique utilisant HTML / CSS proposant diverse interaction avec la base de donnée (modifier, supprimer, ajouter) et pouvant réinitialiser les tables depuis l'API REST les données sont d'une en JSON de l'API REST de l'autre émis de la base de donnée avec PHP et SQL.
- #### Schéma du site
    ```mermaid
    flowchart LR
        id1[(Database
        BD¹)]
        id2([JSON³])
        id3{Navigation}
        id4[(Database)]
        id5{Table}
        id1 <-- URL² --> id2 <-- HTTP⁴ --> Truncate --> id4
        id3 --> Truncate
        id3 --> Drop --> id4
        id3 --> Create --> id4
        id3 --> Insert --> id4
        id3 --> Show --> id5 --> Modifier --> id4
        id5 --> Supprimer --> id4
        id5 --> Ajouter --> id4
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[API]: Application Programming Interface
*[REST]: REpresentational State Transfert
*[PHP]: Protocol Hyper Preprocessor
*[JSON]: JavaScript Object Notation
*[SQL]: Strutured Query Language
#
*¹ BD: Base de donnée*
*² URL: Uniform Resource Language*
*³ JSON: JavaScript Object Notation*
*⁴ HTTP: Hyper Text Tranfert Protocol*
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023