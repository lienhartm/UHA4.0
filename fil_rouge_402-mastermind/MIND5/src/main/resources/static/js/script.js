/**
 * 
 */
    var code = '';
    var affichageDiv = document.getElementById('affichage');
    var inputSubmit = document.getElementById('code');
    
    function ajouterChiffre(chiffre) {
        if (code.length < 4) {
            code += chiffre;
            affichageDiv.innerHTML += getSymbole(chiffre);
            inputSubmit.value = code;
        }
    }
    
    function reset() {
        code = '';
        affichageDiv.innerHTML = '';
        inputSubmit.value = '';
    }
    
    function getSymbole(chiffre) {
        switch (chiffre) {
            case 1:
                return '<span style="font-size: 30px;color:red;">●</span>';
            case 2:
                return '<span style="font-size: 30px;color:green;">●</span>';
            case 3:
                return '<span style="font-size: 30px;color:blue;">●</span>';
            case 4:
                return '<span style="font-size: 30px;color:red;">■</span>';
            case 5:
                return '<span style="font-size: 30px;color:green;">■</span>';
            case 6:
                return '<span style="font-size: 30px;color:blue;">■</span>';
            case 7:
                return '<span style="font-size: 30px;color:red;">▲</span>';
            case 8:
                return '<span style="font-size: 30px;color:green;">▲</span>';
            case 9:
                return '<span style="font-size: 30px;color:blue;">▲</span>';
            default:
                return '';
        }
    }
