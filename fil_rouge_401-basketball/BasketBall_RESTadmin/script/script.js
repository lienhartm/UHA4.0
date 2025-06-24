//
//
/**/// script.js
//
//
const file_joueur = "http://www.web.com/basketball_lienhartmichael/BasketBall_REST/joueurs.php";
const file_equipe = "http://www.web.com/basketball_lienhartmichael/BasketBall_REST/equipes.php";
//
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

        console.log(array_joueur);
        let first = "";
        text = "<h1 class='list_joueurs'>Joueurs<br>"
            + "<button onclick='addJoueurs()'>POST</button>"
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
/*
async function list_joueur(){

    let text = '';

    fetch(file_joueur).then(array_joueur => array_joueur.json()).then(array_joueur => {
        let first = '';
        list_letter = [];
        text = "<h1 class='list_joueurs'>Joueurs<br>"
            + "<button onclick='addJoueurs()'>POST</button><br>";
        for(let joueur of array_joueur['joueurs']){
            if(joueur['nom'][0] > first){
                first = joueur['nom'][0];
                list_letter.push(first);
            }
        }
        for(letter of list_letter){
            //
            console.info(`Lettre ${letter}`);
            // error not referenced
            text += `<a href='javascript:pageAlpha(${letter});' class='letter'>${letter}</a>`;
        }
        text += "</h1><section class='list_joueurs'><div id='page_alpha'></div>";
        document.getElementById('main').innerHTML = text + "</section>";
    });
}
*/
//
//
/*
async function pageAlpha(letter){
    // pageAlpha undefined
    //
    console.log('Bonjour page alpha');
    console.log(letter);
    //
    let page_alpha = '';
    fetch(file_joueur).then(array_joueur => array_joueur.json()).then(array_joueur => {
        page_alpha = `<h2>${letter}</h2><br>`;
        for(let joueur of array_joueur['joueurs']){
            if(joueur['nom'][0] == letter){
                page_alpha += `<a href='javascript:detail_joueur(${joueur['id']});' class="padding">${joueur['nom']}</a><br>`;
            }
        }
        document.getElementById('page_alpha').innerHTML = page_alpha;
    });
}
*/
//
page = 0;
//
async function list_equipe(){

    let text = '';

    fetch (file_equipe).then(array_equipe => array_equipe.json()).then(array_equipe => {
        text = "<h1 class='list_joueurs'>Equipes<br>"
            + "<button onclick='addEquipes()'>POST</button>"
            + "</h1><section class='list_equipes'>";
        for(let equipe of array_equipe['equipes']){
            text += `<a href='javascript:detail_equipe(${equipe['id']});' class='shadow'>`
                + `<figure class='list'>`
                + `<img src='${equipe['logo']}' alt='${equipe['nom']}'>`
                + `<figcaption>${equipe['nom']}</figcaption>`
                + `</figure></a>`;
        }

        document.getElementById('main').innerHTML = text + "</section>";
    });

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
                    document.getElementById('main').innerHTML = `<section class='detail_joueur'>`
                        + `<h1></h1>`
                        + `<div class='section_joueur'>`
                        + `<figure class='figure_joueur ${equipe['nom'].replace(' ', '')}'>`
                        + `<img src='${equipe['logo']}' alt='${equipe['nom']}' class='figure_joueur'>`
                        + `<figcaption class='figure_joueur'>${joueur['nom'].split(',')[0]}<br>${joueur['No']}</figcaption>`
                        + `</figure><article class='article_joueur'>`
                        + `<h2 class='nom_joueur'>${joueur['nom']}<br>`
                        + `<button onclick='updateJoueurs(${joueur['id']})'>PUT</button>`
                        + `<button onclick='deleteJoueur(${joueur['id']})'>DELETE</button>`
                        + `<p><b>Nom: </b>${joueur['nom']}</p>`
                        + `<p><b>Numero: </b>${joueur['No']}</p>`
                        + `<p><b>Position: </b>${joueur['position']}</p>`
                        + `<p><b>Equipe: </b><a href='javascript:detail_equipe(${equipe['id']});' class="link">${equipe['nom']}</a></p>`
                        + `<p><b>Taille :</b> ${joueur['taille']}</p>`
                        + `<p><b>Poid :</b> ${joueur['poid']}</p>`
                        + `<p><b>IMC :</b></p>`
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
                + `<h2 class='description_equipe'>${equipes['nom']}<br>`
                + `<button onclick='updateEquipes(${equipes['id']})'>PUT</button>`
                + `<button onclick='deleteEquipe(${equipes['id']})'>DELETE</button>`
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
function addEquipes(){

    document.getElementById('main').innerHTML = "<section class='add'>"
        + "<form method='post' action='javascript:addequipes()' accept-charset='utf-8'>"
        + "<fieldset>"
        + "<legend>Ajouter une equipe</legend>"
        + "<label for='nom'>Nom</label>"
        + "<input id='nom' name='nom' type='text' value='' /><br>"
        + "<label for='localisations'>Localisation</label>"
        + "<input id='localisations' name='localisations' value='' /><br>"
        + "<label for='division' >Division</label>"
        + "<input id='division' name='division' value='' /><br>"
        + "<label for='creation'>Creation</label>"
        + "<input id='creation' name='creation' value='' /><br>"
        + "<label for='logo'>Logo</label>"
        + "<input id='logo' name='logo' value='' /><br>"
        + "<input type='submit' name='addEquipe'>"
        + "</fieldset>"
        + "</form>"
        + "</section>";

}
//
//
function addequipes(){

    nom = document.getElementById('nom').value;
    localisations = document.getElementById('localisations').value;
    division = document.getElementById('division').value;
    creation = document.getElementById('creation').value;
    logo = document.getElementById('logo').value;

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`${http()}/equipes.php?nom=${nom}&localisations=${localisations}&division=${division}&creation=${creation}&logo=${logo}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
//
//
function addJoueurs(){

    document.getElementById('main').innerHTML = "<section  class='add'>"
        + "<form method='post' action='javascript:addjoueurs()' accept-charset='utf-8'>"
        + "<fieldset>"
        + "<legend>Ajouter un joueur</legend>"
        + "<label for='nom'>Nom</label>"
        + "<input id='nom' name='nom' type='text' value='' /><br>"
        + "<label for='position'>Position</label>"
        + "<input id='position' name='position' type='text' value='' /><br>"
        + "<label for='No'>No</label>"
        + "<input id='No' name='No' type='number' value='' /><br>"
        + "<label for='equipe'>Equipe</label>"
        + "<input id='equipe' name='equipe' type='text' value='' /><br>"
        + "<label for='taille'>Taille</label>"
        + "<input id='taille' name='taille' type='text' value='' /><br>"
        + "<label for='poid'>Poid</label>"
        + "<input id='poid' name='poid' type='text' value='' /><br>"
        + "<input type='submit' name='addJoueur'>"
        + "</fieldset>"
        + "</form>"
        + "</section>";
}
//
//
function addjoueurs(){

    nom = document.getElementById('nom').value;
    position = document.getElementById('position').value;
    No = document.getElementById('No').value;
    equipe = document.getElementById('equipe').value;
    taille = document.getElementById('taille').value;
    poid = document.getElementById('poid').value;

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`${http()}/joueurs.php?nom=${nom}&position=${position}&No=${No}&equipe=${equipe}&taille=${taille}&poid=${poid}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
//
//
function updateEquipes(id_array){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${http()}/equipes.php?id=${id_array}`, requestOptions).then(equipes => equipes.json()).then(equipes => {
            document.getElementById('main').innerHTML = `<section class='update'>`
                + `<form method='post' action='javascript:updateequipe(${equipes['id']})' accept-charset='utf-8'>`
                + `<label for='id'>id</label>`
                + `<input type='text' id='id' value='${equipes['id']}' name='id'><br>`
                + `<label for='nom'>nom</label>`
                + `<input type='text' id='nom' value='${equipes['nom']}' name='nom'><br>`
                + `<label for='localisations'>localisations</label>`
                + `<input type='text' id='localisations' value='${equipes['localisations']}' name='localisations'><br>`
                + `<label for='division'>division</label>`
                + `<input type='text' id='division' value='${equipes['division']}' name='division'><br>`
                + `<label for='creation'>creation</label>`
                + `<input type='text' id='creation' value='${equipes['creation']}' name='creation'><br>`
                + `<label for='logo'>logo</label>`
                + `<input type='text' id='logo' value='${equipes['logo']}' name='logo'><br>`
                + `<input type='submit' name='table'>`
                + `</form>`
                + `</section>`;
    }).catch(error => console.log('error', error));

}
//
//
function updateequipe(id){

    id = document.getElementById('id').value;
    nom = document.getElementById('nom').value;
    localisations = document.getElementById('localisations').value;
    division = document.getElementById('division').value;
    creation = document.getElementById('creation').value;
    logo = document.getElementById('logo').value;

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(`${http()}/equipes.php?id=${id}&nom=${nom}&localisations=${localisations}&division=${division}&creation=${creation}&logo=${logo}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
}
//
//
function updateJoueurs(id_array){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${http()}/joueurs.php?id=${id_array}`, requestOptions).then(joueur => joueur.json()).then(joueur => {
        document.getElementById('main').innerHTML = `<section class='update'>`
            + `<form method='post' action='javascript:updatejoueur(${joueur['id']})' accept-charset='utf-8'>`
            + `<label for='id'>id</label>`
            + `<input type='text' id='id' value='${joueur['id']}' name='id'><br>`
            + `<label for='nom'>nom</label>`
            + `<input type='text' id='nom' value='${joueur['nom']}' name='nom'><br>`
            + `<label for='position'>position</label>`
            + `<input type='text' id='position' value='${joueur['position']}' name='position'><br>`
            + `<label for='No'>No</label>`
            + `<input type='text' id='No' value='${joueur['No']}' name='No'><br>`
            + `<label for='equipe'>equipe</label>`
            + `<input type='text' id='equipe' value='${joueur['equipe']}' name='equipe'><br>`
            + `<label for='taille'>taille</label>`
            + `<input type='text' id='taille' value='${joueur['taille']}' name='taille'><br>`
            + `<label for='poid'>poid</label>`
            + `<input type='text' id='poid' value='${joueur['poid']}' name='poid'><br>`
            + `<input type='submit' name='table'>`
            + `</form>`
            + `</section>`;
    }).catch(error => console.log('error', error));

}
//
//
function updatejoueur(id){

    id = document.getElementById('id').value;
    nom = document.getElementById('nom').value;
    position = document.getElementById('position').value;
    No = document.getElementById('No').value;
    equipe = document.getElementById('equipe').value;
    taille = document.getElementById('taille').value;
    poid = document.getElementById('poid').value;

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(`${http()}/joueurs.php?&id=${id}&nom=${nom}&position=${position}&No=${No}&equipe=${equipe}&taille=${taille}&poid=${poid}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
//
//
function deleteEquipe(id){

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(`${http()}/equipes.php?id=${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
//
//
//
function deleteJoueur(id){

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
      
    fetch(`${http()}/joueurs.php?id=${id}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
//
//
