
function retour() {

    window.location.href = '../index.html';

}

function reset() {
    code = '';
    affichageDiv.innerHTML = '';
}

function getSymbole(chiffre) {
    switch (chiffre) {
        case 1:
            return '<span style="font-size: 30px;color:red;">&#9679;</span>';
        case 2:
            return '<span style="font-size: 30px;color:green;">&#9679;</span>';
        case 3:
            return '<span style="font-size: 30px;color:blue;">&#9679;</span>';
        case 4:
            return '<span style="font-size: 30px;color:red;">&#9632;</span>';
        case 5:
            return '<span style="font-size: 30px;color:green;">&#9632;</span>';
        case 6:
            return '<span style="font-size: 30px;color:blue;">&#9632;</span>';
        case 7:
            return '<span style="font-size: 30px;color:red;">&#9650;</span>';
        case 8:
            return '<span style="font-size: 30px;color:green;">&#9650;</span>';
        case 9:
            return '<span style="font-size: 30px;color:blue;">&#9650;</span>';
        default:
            return '';
    }
}