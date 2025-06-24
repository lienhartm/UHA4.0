//
/**/// script.js
//
const file_joueur = "https://filrouge.uha4point0.fr/V2/basketball/joueurs";
const file_equipe = "https://filrouge.uha4point0.fr/V2/basketball/equipes";
//
// function affichage list joueurs
//
//
async function list_joueur(){
    let list_joueur_nom = new Array();
    fetch (file_joueur)
    .then(array_joueur => array_joueur.json())
    .then(array_joueur => {
        for(let joueur in array_joueur){
            list_joueur_nom.push(array_joueur[joueur].nom);
        }
        list_joueur_nom.sort();
        let list_joueur_id = new Array();
        for(let nom_joueur of list_joueur_nom){
            for(let joueur in array_joueur){
                if(nom_joueur == array_joueur[joueur].nom){
                    list_joueur_id.push(array_joueur[joueur].id);
                }
            }
        }
        let text = "<h1 class='list_joueurs'>Joueurs</h1><section class='list_joueurs'>";
        let first = "";
        for(let joueur in list_joueur_nom){
            if(list_joueur_nom[joueur][0] > first){
                first = list_joueur_nom[joueur][0];
                text += `<h2>${first}</h2><hr>`;
            }
            text += `<a href="javascript:detail_joueur(${list_joueur_id[joueur]});" class="padding">${list_joueur_nom[joueur]}</a><br>`;
        }
        document.getElementById('main').innerHTML = text + "</section>";
        //
    });
}
//
//
//
async function list_equipe(){
    let list_equipe_nom = new Array();
    fetch (file_equipe)
    .then(array_equipe => array_equipe.json())
    .then(array_equipe => {
        for(let equipe in array_equipe){
            list_equipe_nom.push(array_equipe[equipe].nom);
        }
        list_equipe_nom.sort();
        let list_equipe_id = new Array();
        let list_equipe_logo = new Array();
        for(let nom_equipe of list_equipe_nom){
            for(let equipe in array_equipe){
                if(nom_equipe == array_equipe[equipe].nom){
                    list_equipe_id.push(array_equipe[equipe].id);
                    list_equipe_logo.push(array_equipe[equipe].logo);
                }
            }
        }
        let text = `<h1 class='list_equipes'>Equipes</h1><section class='list_equipes'>`;
        for(let equipe in list_equipe_id){
            text += `<a href='javascript:detail_equipe(${list_equipe_id[equipe]});' class='shadow'>`
                + `<figure class='list'>`
                + `<img src='${list_equipe_logo[equipe]}' alt='${list_equipe_nom[equipe]}'>`
                + `<figcaption>${list_equipe_nom[equipe]}</figcaption>`
                + `</figure></a>`;
        }
        document.getElementById('main').innerHTML = text + "</section>";
    });
    
}
//
//
async function detail_joueur(id_array){

    fetch(file_joueur).then(array_joueur=>array_joueur.json()).then(array_joueur => {
        fetch(file_equipe).then(array_equipe=>array_equipe.json()).then(array_equipe => {

            for(joueur in array_joueur){
                if(array_joueur[joueur].id == id_array){
                    for(equipe in array_equipe){
                        if(array_equipe[equipe].id == array_joueur[joueur].equipe){
                            let equipe_id = array_equipe[equipe].id;
                            let equipe_nom = array_equipe[equipe].nom;
                            let equipe_logo = array_equipe[equipe].logo;

                            document.getElementById('main').innerHTML = `<section class='detail_joueur'>`
                                + `<div class='section_joueur'>`
                                + `<figure class='figure_joueur ${equipe_nom.replace(' ', '')}'>`
                                + `<img src='${equipe_logo}' alt='${equipe_nom}' class='figure_joueur'>`
                                + `<figcaption class='figure_joueur'>${array_joueur[joueur].nom.split(',')[0]}<br>${array_joueur[joueur].No}</figcaption>`
                                + `</figure>`
                                + `<article class='article_joueur'>`
                                + `<h2 class='nom_joueur'>${array_joueur[joueur].nom}</h2>`
                                + `<p><b>Nom: </b>${array_joueur[joueur].nom}</p>`
                                + `<p><b>Numero: </b>${array_joueur[joueur].No}</p>`
                                + `<p><b>Position: </b>${array_joueur[joueur].position}</p>`
                                + `<p><b>Equipe: </b><a href='javascript:detail_equipe(${equipe_id});' class="link">${equipe_nom}</a></p>`
                                + `</div></section>`;
                        }
                    }
                }
            }
        });
    });

}
//
//
async function detail_equipe(id_array){

    fetch(file_equipe)
    .then(array_equipe => array_equipe.json())
    .then(array_equipe => {

        let text = "<section class='detail_equipe'>";
        for(equipe of array_equipe){
            if(equipe.id == id_array){

                text += `<figure class='detail_equipe ${equipe.nom.replace(' ', '')}'>`
                    + `<img src='${equipe.logo}' alt='${equipe.nom}'>`
                    + `<figcaption class='detail_equipe'>${equipe.nom}</figcaption>`
                    + `</figure>`
                    + `<article class='description_equipe'>`
                    + `<h2 class='description_equipe'>${equipe.nom}</h2>`
                    + `<p><b>Nom: </b>${equipe.nom}</p>`
                    + `<p><b>Localisations: </b>${equipe.localisations}</p>`
                    + `<p><b>Division: </b>${equipe.division}</p>`
                    + `<p><b>Fondation: </b>${equipe.creation}</p>`
                    + `</article>`
                    + `<article class='enum_joueur'>`
                    + `<h2 class='enum_joueur'>Joueurs:</h2>`
                    + `<div class='enum_joueur'>`;
            }
        }

        fetch(file_joueur)
        .then(array_joueur => array_joueur.json())
        .then(array_joueur => {
            for(let joueur in array_joueur){
                if(array_joueur[joueur].equipe == id_array){
                    text += `<p><a href="javascript:detail_joueur(${array_joueur[joueur].id});" class="link">${array_joueur[joueur].nom}</a></p>`;
                }
            }
            document.getElementById('main').innerHTML = text + "</div></article></section>";
        });
    });
       
}
//
//
