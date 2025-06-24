<!-- file.php -->
<?php
//
    $file_joueurs = 'https://filrouge.uha4point0.fr/V2/basketball/joueurs';
        $data_joueurs = file_get_contents($file_joueurs);
            $array_joueurs = json_decode($data_joueurs);
//
    $file_equipes = 'https://filrouge.uha4point0.fr/V2/basketball/equipes';
        $data_equipes = file_get_contents($file_equipes);
            $array_equipes = json_decode($data_equipes);
//
//
?>
<!-- EOF -->