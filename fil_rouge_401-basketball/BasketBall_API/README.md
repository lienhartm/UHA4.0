***
### DOCUMENTATION
***
>##### Nom du programme : Basketball_RESTAPI
>##### Auteur : LIENHART Michaël
#
- #### Description :
    Ceci est une API REST, un service WEB mettant à disposition des informations d'une base de donnée à partir d'un server par l'URL permettant la diffusion en JSON de ces dernières. Il est donc possible par le biais d'un site ou d'une application d'afficher et de communiquer via des requête HTTP si le service le permet. 
- #### Terminaisons :
    - joueurs : ~BasketBall_API/joueurs.php

    - equipes : ~BasketBall_API/equipes.php
- #### Schema type
    ```mermaid
    flowchart LR
        id1[(Database)]
        id2([JSON])
        id3[[client]]
        id1 <-- URL --> id2 <-- HTTP --> id3
    ```
- #### Contenu du [dossier](ls.txt)
*[API]: Application Programming Interface
*[REST]: REpresentational State Transfert
*[WEB]: World Wide Web
*[URL]: Uniform Resource Locator
*[JSON]: JavaScript Object Notation
*[HTTP]: Hyper Text TRansfer Protocol
#
>###### 4.0.1 - Fil Rouge - UHA 4.0 - 2023