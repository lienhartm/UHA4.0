<?php
//
    $file_joueurs = 'http://www.web.com/basketball_lienhartmichael/BasketBall_phpAPI/joueurs.php';
        $data_joueurs = file_get_contents($file_joueurs);
            $array_joueurs = json_decode($data_joueurs);
//
    $file_equipes = 'http://www.web.com/basketball_lienhartmichael/BasketBall_phpAPI/equipes.php';
        $data_equipes = file_get_contents($file_equipes);
            $array_equipes = json_decode($data_equipes);
//
    $file_couleurs = 'http://www.web.com/basketball_lienhartmichael/BasketBall_phpAPI/couleurs.php';
        $data_couleurs = file_get_contents($file_couleurs);
            $array_couleurs = json_decode($data_couleurs);
//
?>
<!-- EOF -->