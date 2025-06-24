<!-- Details.php -->
<?php

require_once "Dao.php";

    class Details {

        public function detailEquipe($id){

            $pdo = new DAO();

            $requete = "SELECT * FROM equipes WHERE id = $id;";

            $details_equipes = $pdo->executeRequest($requete);

            $requete_joueurs = "SELECT joueurs.id, joueurs.nom FROM joueurs WHERE joueurs.equipe = $id ORDER BY nom;";

            $lists_joueurs = $pdo->executeRequest($requete_joueurs);

            require "vue/details_equipe.php"; // redirection fichier /vue/details_equipe

        }

        public function detailJoueur($id){

            $pdo = new DAO();

            $requete = "SELECT * FROM joueurs WHERE id = $id";

            $details_joueurs = $pdo->executeRequest($requete);

            $requete_equipe = "SELECT equipes.id, equipes.nom, equipes.logo FROM equipes JOIN joueurs ON equipes.id = joueurs.equipe WHERE joueurs.id = $id";

            $equipes = $pdo->executeRequest($requete_equipe);

            require "vue/details_joueur.php"; // redirection fichier /vue/details_joueur

        }

    }

?>