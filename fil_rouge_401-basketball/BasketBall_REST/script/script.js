//
//
/**/// script.js
//
//
const file_joueur = `${http()}/joueurs.php`;
const file_equipe = `${http()}/equipes.php`;
//
let page = 0;
//
let adminpass = document.getElementById('admin');
adminpass.addEventListener('click', admin);
//
//
function admin(){
    let text = "<h2>ADMIN</h2>"
                + "<form  action='javascript:motdepass()'>"
                + "<label for='identifiant'>Identifiant</label>"
                + "<input id='identifiant' name='identifiant' type='text' value=''>"
                + "<br>"
                + "<label for='motdepass'>Mot de passe</label>"
                + "<input id='motdepass' name='motdepass' type='text' value=''>"
                + "<br>"
                + "<input type='submit' value='accept'>"
                + "</form>";

    document.getElementById('index').innerHTML = text;
}
//
//
function motdepass(){
    let id = document.getElementById('identifiant').value;
    let mdp = document.getElementById('motdepass').value;
    if(id == "lienhart" & mdp == 'password'){
        document.getElementById('index').innerHTML = "OK";
    } else { document.getElementById('index').innerHTML = "SORRY";}
}
//
//
function http(){

    let http = document.URL.split("/");
    let count = http.length;
    let https = [];
    for(let i = 0; i < count-1; i++){ https.push(http[i]); } 
    return https.join("/");

}
//
//
//
//
async function list_joueur(){

    let text = '';

    fetch (file_joueur).then(array_joueur => array_joueur.json()).then(array_joueur => {

        let first = "";
        text = "<h1 class='list_joueurs'>Joueurs<br>"
            + "</h1><section class='list_joueurs'>";
        for(let joueur of array_joueur['joueurs']){
            if(joueur['nom'][0] > first){
                first = joueur['nom'][0];
                text += `<h2>${first}</h2><hr>`;
            }
            text += `<a href="javascript:detail_joueur(${joueur['id']});" class="padding">${joueur['nom']}</a><br>`;
        }
        document.getElementById('main').innerHTML = text + "</section>";
    });

}
//
//
async function list_equipe(page){

    let text = "<h1 class='list_joueurs'>Equipes<br><button onclick='pre(page)'> <<< </button><button onclick='sui(page)'> >>> </button>"
    + "</h1><section class='list_equipes'>";

    fetch (file_equipe).then(array_equipe => array_equipe.json()).then(array_equipe => {

        //for(let row_equipe in array_equipe['equipes']){
            for(let i = page*4; i < (page+1)*4; i++){
                let equipe = array_equipe['equipes'][i];
                if(!equipe) {continue;}
                text += `<a href='javascript:detail_equipe(${equipe['id']});' class='shadow'>`
                + `<figure class='list'>`
                + `<img src='${equipe['logo']}' alt='${equipe['nom']}'>`
                + `<figcaption>${equipe['nom']}</figcaption>`
                + `</figure></a>`;
            }
        //}

        document.getElementById('main').innerHTML = text + "</section>";
    });

}
//
//
function pre(){

    page--;
    list_equipe(page);

}
//
//
function sui(){

    page++;
    list_equipe(page);

}
//
//
//
//
async function detail_joueur(id_array){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${http()}/joueurs.php?id=${id_array}`, requestOptions).then(joueur => joueur.json()).then(joueur => {
        fetch(file_equipe).then(array_equipe => array_equipe.json()).then(array_equipe => {
            for(let equipe of array_equipe['equipes']){
                if(equipe['id'] == joueur['equipe']){
                    let imc = Math.round(joueur['poid'] / (joueur['taille'] * joueur['taille']));
                    document.getElementById('main').innerHTML = `<section class='detail_joueur'>`
                        + `<h1></h1>`
                        + `<div class='section_joueur'>`
                        + `<figure class='figure_joueur ${equipe['nom'].replace(' ', '')}'>`
                        + `<img src='${equipe['logo']}' alt='${equipe['nom']}' class='figure_joueur'>`
                        + `<figcaption class='figure_joueur'>${joueur['nom'].split(',')[0]}<br>${joueur['No']}</figcaption>`
                        + `</figure><article class='article_joueur'>`
                        + `<h2 class='nom_joueur'>${joueur['nom']}</h2>`
                        + `<p><b>Nom: </b> ${joueur['nom']}</p>`
                        + `<p><b>Numero: </b> ${joueur['No']}</p>`
                        + `<p><b>Position: </b> ${joueur['position']}</p>`
                        + `<p><b>Equipe: </b><a href='javascript:detail_equipe(${equipe['id']});' class="link">${equipe['nom']}</a></p>`
                        + `<p><b>Taille :</b> ${joueur['taille']}</p>`
                        + `<p><b>Poid :</b> ${joueur['poid']}</p>`
                        + `<p><b>IMC :</b> ${imc}</p>`
                        + `</div>`
                        + `</section>`;
                }
            }
        }).catch(error => console.log('error', error));
    }).catch(error => console.log('error', error));

}
//
//
async function detail_equipe(id_array){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${http()}/equipes.php?id=${id_array}`, requestOptions).then(equipes => equipes.json()).then(equipes => {
        fetch(file_joueur).then(array_joueur => array_joueur.json()).then(array_joueur => {
            let text = "<section class='detail_equipe'>"
                + `<figure class='detail_equipe ${equipes['nom'].replace(' ', '')}'>`
                + `<img src='${equipes['logo']}' alt='${equipes['nom']}'>`
                + `<figcaption class='detail_equipe'>${equipes['nom']}</figcaption>`
                + `</figure>`
                + `<article class='description_equipe'>`
                + `<h2 class='description_equipe'>${equipes['nom']}</h2>`
                + `<p><b>Nom: </b>${equipes['nom']}</p>`
                + `<p><b>Localisations: </b>${equipes['localisations']}</p>`
                + `<p><b>Division: </b>${equipes['division']}</p>`
                + `<p><b>Fondation: </b>${equipes['creation']}</p>`
                + `</article>`
                + `<article class='enum_joueur'>`
                + `<h2 class='enum_joueur'>Joueurs:</h2>`
                + `<div class='enum_joueur'>`;
            for(let joueur of array_joueur['joueurs']){
                if(joueur['equipe'] == equipes['id']){
                    text += `<p><a href="javascript:detail_joueur(${joueur['id']});" class="link">${joueur['nom']}</a></p>`;
                }
            }
            document.getElementById('main').innerHTML = text + `</div></article></section>`;
        }).catch(error => console.log('error', error));
    }).catch(error => console.log('error', error));

}
//
//