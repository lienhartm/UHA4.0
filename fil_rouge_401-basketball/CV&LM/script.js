/* script.js */
'use strict'
//
function home() {

    document.getElementById('main').style.backgroundColor = 'white';
    document.getElementById('main').innerHTML =     "<section class='home'>"
                                                    + ""
                                                    + "</section>";

}

function research() {

    document.getElementById('main').style.backgroundColor = 'white';
    document.getElementById('main').innerHTML =     "<section class='research'>"
                                                    + ""
                                                    + "</section>";

}

function cv() {

    document.getElementById('main').style.backgroundColor = 'white';
    document.getElementById('main').innerHTML =     "<section class='cv'>"
                                                    + "<h2>Comptétences</h2>"
                                                    + "<p></p>"
                                                    + "<h2>Expériences</h2>"
                                                    + "<p></p>"
                                                    + "<h2>Formations</h2>"
                                                    + "<p></p>"
                                                    + "<h2>Informations complémentaires</h2>"
                                                    + "<p></p>"
                                                    + "<a href='' download class='telecharger'>Télécharger le C.V.</a>"
                                                    + "</section>";

}

function project() {

    document.getElementById('main').style.backgroundColor = 'white';
    document.getElementById('main').innerHTML =     "<section class='project'>"
                                                    + ""
                                                    + "</section>";

}

function contact() {

    document.getElementById('main').style.backgroundColor = 'white';
    document.getElementById('main').innerHTML =     "<section class='contact'>"
                                                    + "<form action='' method=''>"
                                                    + "<label for='nom'>Nom : </label>"
                                                    + "<br />"
                                                    + "<input id='nom' type='text' name='nom' value='...'>"
                                                    + "<br />"
                                                    + "<label for='courriel'>Courriel : </label>"
                                                    + "<br />"
                                                    + "<input id='courriel' type='email' name='courriel' value='...'>"
                                                    + "<br />"
                                                    + "<label for='sujet'>Sujet : </label>"
                                                    + "<br />"
                                                    + "<input id='sujet' type='text' name='sujet' value='...'>"
                                                    + "<br />"
                                                    + "<label for='message'>Message : </label>"
                                                    + "<br />"
                                                    + "<textarea id='message' name='message' cols='24' rows='10' value='...'></textarea>"
                                                    + "<br />"
                                                    + "<input type='submit' value='Envoyer' class='center'>"
                                                    + "</form>"
                                                    + "</section>";

}