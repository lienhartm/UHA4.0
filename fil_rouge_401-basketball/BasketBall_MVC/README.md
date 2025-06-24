***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_MVC
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci un un site WEB utilisant une architecture MVC pour Modèle - Vue - Contrôleur. Les données affiché proviennent de la base de données. Les langage employé sont le HTML / CSS, PHP et SQL.
- #### Schéma du site
    ```mermaid
    flowchart LR
        id1[(Database
        BD¹)]
        subgraph controleur [Controleur]
        id1 <--PDO¹--> Controleur
        end
        subgraph modele [Modele]
        Template
        end
        subgraph vue [Vue]
        Lists --> Details
        end
        modele <--> vue <--> controleur
    ```
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheet
*[MVC]: Model-View-Controller
*[PHP]: Protocol Hyper Processor
*[SQL]: Structured Query Language
#
*¹ BD: Base de donnée*
*² PDO: Protocol Data Object*
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023