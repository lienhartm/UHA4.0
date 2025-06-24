/********************************
 * 
 *    ***** *****  **** *****
 *      *   *     *       *
 *      *   ***    ***    *
 *      *   *         *   *
 *      *   ***** ****    *
 * 
 *///////////////////////////////

/////////////////
 // URL serveur //
/////////////////

//const url = `${window.location.protocol}//${window.location.hostname}:4000`;
const url = `http://localhost:4000/`;

/**
 * 1
 */
  ///////////////////////////////////////
 // Requête d'inscription utilisateur //
///////////////////////////////////////
/* 
    * n   | http  |                     requête                                   |                     reponse

    ----------------------------------------------------------------------------------------------------------------------------

    * 1   |  200  |   {"nom":"Effel","prenom":"Gustave","numero":"1234512345"}    |   {"status":"success","message":"Utilisateur inscrit avec succès"}

    * 2   |  400  |   {"nom":"","prenom":"Octave","numero":"2345123451"}          |   {"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}
  
    * 3   |  400  |   {"nom":"Steffel","prenom":"","numero":"3451234523"}         |   {"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}

    * 4   |  400  |   {"nom":"Steffel","prenom":"Octave","numero":""}             |   {"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}

    * 5   |  409  |   {"nom":"Effel","prenom":"Gustave","numero":"1234512345"}    |   {"status":"error","message":"L'utilisateur existe déjà"}
*/
const inscription = [
  {"titre":"Test Inscription Correct","nom":"Steffel","prenom":"Octave","numero":"1234512345",'reponse':'{"status":"success","message":"Utilisateur inscrit avec succès"}'},
  {"titre":"Test Inscription Doublon","nom":"Effel","prenom":"Gustave","numero":"1234512345",'reponse':'{"status":"error","message":"L\'utilisateur existe déjà"}'},
  {"titre":"Test Inscription Sans nom","nom":"","prenom":"Octave","numero":"1234512345",'reponse':'{"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}'},
  {"titre":"Test Inscription Sans prenom","nom":"Steffel","prenom":"","numero":"1234512345",'reponse':'{"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}'},
  {"titre":"Test Inscription Sans numero","nom":"Steffel","prenom":"Octave","numero":"",'reponse':'{"status":"error","message":"Tous les champs (nom, prenom, numero) sont requis"}'},
  ]

console.log('\n\n\t/*****************************\n\t *\n\t *\tTest Inscription \n\t *\n\t */***************************\n\n')

for ( const user of inscription ) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nom": user.nom,
    "prenom": user.prenom,
    "numero": user.numero,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(`${url}personnes`, requestOptions)
    .then((response) => response.text() )
    .then((result) => console.log(`${user.titre}\n\n\tSend => Nom: ${user.nom}, Prenom: ${user.prenom}, Numéro: ${user.numero}\n\n\tAttente => ${user.reponse}\n\n\tReceive => ${result}\n\n\tTest => ${result === user.reponse ? 'True' : 'False'}\n\n`))
}
/**
 * 2
 */
  ///////////////////////////////////
 // Requête connexion utilisateur //
///////////////////////////////////
/*
    * n   |  http |                   requete                                     |                 reponse

    -----------------------------------------------------------------------------------------------------------------------

    * 1   |  200  |   {"nom":"Effel","prenom":"Gustave","numero":"1234512345"}    |   {"status":"success","message":"Connexion réussie","data":{"accessToken":"**********"}}

    * 2   |  400  |   {"nom":"Doe","prenom":"John","numero":"2345123451"}         |   {"status":"error","message":"Identifiant incorrect"}   

    * 3   |  401  |   {"nom":"Effel","prenom":"Gustave","numero":"2345678901"}    |   {"status":"error","message":"Mot de passe incorrect"}
*/
const connexion = [
  {"titre":"Test connexion Correct","nom":"Effel","prenom":"Gustave","numero":"1234512345","reponse":'Connexion réussie'},
  {"titre":"Test connexion Corrupt","nom":"Doe","prenom":"John","numero":"2345123451","reponse":'Identifiant incorrect'},
  {"titre":"Test connexion Erreur","nom":"Effel","prenom":"Gustave","numero":"2345678901","reponse":'Mot de passe incorrect'},
]

console.log('\n\n\t/*****************************\n\t *\n\t *\tTest Connexion \n\t *\n\t */***************************\n\n')

for ( let user of connexion ) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "identifiant": `${user.nom}${user.prenom}`,
    "motdepasse": user.numero,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(`${url}login`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(`${user.titre}\n\n\tSend => Nom: ${user.nom}, Prenom: ${user.prenom}, Numéro: ${user.numero}\n\n\tAttente => ${user.reponse}\n\n\tReceive => ${JSON.stringify(result)}\n\n\tTest => ${result.message === user.reponse ? 'True' : 'False'}\n\n`))
}
/**
 * 3
 */
  /////////////////////////////////
 // Requête création d'une note //
/////////////////////////////////
/*

  Connexion avec ces données => {"nom":"Effel","prenom":"Gustave","numero":"1234512345"}

  ----------

    * n   |  http |                   requete                                     |                 reponse

    -----------------------------------------------------------------------------------------------------------------------

    * 1   |  200  | {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                                                                                      {"status": "success","message": "Note créée"}

    * 2   |  413  | {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh. Nunc tincidunt, neque in varius elementum, augue felis malesuada accumsan."}
                                                                                      {"status": "error","error": "La taille du fichier excède la limite autorisée de 1 Ko."}

    * 3   |  413  | {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                    {"titre": "", "contenu": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae ligula non arcu iaculis volutpat a nec quam. Sed laoreet interdum nisl non iaculis. Integer vitae ullamcorper velit. Mauris ut tristique urna, a fringilla tortor. Vestibulum congue egestas ante, nec bibendum quam volutpat maximus. Curabitur gravida dignissim consectetur. Nunc non tristique libero. Nulla vulputate a lorem a faucibus. Ut ut nulla massa. Donec tempor quis enim quis lobortis. Aliquam ante massa, congue a eros at, lacinia porttitor libero. Nam maximus pulvinar lacus a euismod. Praesent ex mauris, ornare ut mauris ut, condimentum vehicula dui. Etiam luctus diam sem, in viverra turpis varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin elementum congue consequat. Phasellus in ligula nec est dignissim dictum. Suspendisse sollicitudin aliquam est vel pretium. Vestibulum orci lorem, accumsan vitae commodo ut, faucibus pellentesque nibh." }
                                                                                      {"status": "error","error": "La taille totale des notes dépasse la limite autorisée de 10 Ko."}
    * 4   | 
*/
/*
const notes = [

]
*/

//console.log('\n\n\t/*****************************\n\t *\n\t *\tTest Notes \n\t *\n\t */***************************\n\n')
/*
for ( let doc of notes ) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "••••••");

  const raw = JSON.stringify({
    "titre": doc.titre,
    "contenu": doc.contenu,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:4000/notes", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
    */