***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_phpsql
>##### Auteur : LIENHART Michaël
>##### API REST :
> - https://filrouge.uha4point0.fr/v2
> - https://filrouge.uha4point0.fr/V2/basketball/joueurs
> - https://filrouge.uha4point0.fr/V2/basketball/equipes
#
- #### Description :
Ceci est un service WEB appelé API REST, se sont des données provenant d'une base de données fournit par un serveur en format JSON, accessible grace à leurs URL et pouvant répondre à des reqquête via les méthodes HTTP.
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
    - basketball/joueurs
    - basketball/equipes
    ###### Les requetes et leurs chemins
    | Chemin                                                     | Methode | Description |
    | :--------------------------------------------------------- | :-----: | -------------------------------------: |
    | https://filrouge.uha4point0.fr/v2                          | GET     | Affiche touts les API's                        |
    | https://filrouge.uha4point0.fr/V2/all                      | GET     | Afficher tous les données sur                   |
    | https://filrouge.uha4point0.fr/V2/reset/:apiName           |         | Réinitialiser l'api ciblée sur         |
    | https://filrouge.uha4point0.fr/V2/delete/:apiName          | DELETE  | Retirer tous les éléménets de l'api ciblée sur |
    https://filrouge.uha4point0.fr/V2/:apiName/:elementsName     | POST    | Poster un élément sur                         |
    https://filrouge.uha4point0.fr/V2/:apiName/:elementsName/:id | DELETE  | Supprimer un élément sur               |
#
- #### Contenu du [dossier](ls.txt)
*[WEB]: World Wide Web
*[HTTP]: Hyper Text Transfert Protocol
*[URL]: Uniform Resource Language
*[JSON]: JavaScript Object Notation
*[URL]; Uniform Resource Language
*[HTTP]: Hyper Text Transfert Protocol
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023