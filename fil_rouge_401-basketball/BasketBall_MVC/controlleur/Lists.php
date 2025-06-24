<!-- Lists.php --> 
<?php

require_once "Dao.php";

    class Lists {

        public function listEquipe(){

            $pdo = new DAO();

            $requete = "SELECT id, nom, logo FROM equipes ORDER BY nom;";

            $lists_equipes = $pdo->executeRequest($requete);

            require "vue/lists_equipe.php"; // redirection fichier /vue/details_equipe

        }

        public function listJoueur(){

            $pdo = new DAO();

            $requete = "SELECT id, nom FROM joueurs ORDER BY nom;";

            $lists_joueurs = $pdo->executeRequest($requete);

            require "vue/lists_joueur.php"; // redirection fichier /vue/details_joueur
            
        }

    }

?>