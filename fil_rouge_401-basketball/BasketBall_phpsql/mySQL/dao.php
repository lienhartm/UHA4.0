<!-- dao.php -->
<?php

class DAO{

    private $bdd;

    public function __construct(){

        $this->bdd = new PDO('mysql:host=localhost;dbname=basketball;charset=utf8', 'lienhart', 'password');
    }

    function getBDD(){
        return $this->bdd;
    }

    public function executeRequest($sql, $params = NULL){
        
        if ($params == NULL){
            $resultat = $this->bdd->query($sql);
        }else{$

            $resultat = $this->bdd->prepare($sql); 
            $resultat->execute([$params]);
        }

        return $resultat;
    }
}

?>