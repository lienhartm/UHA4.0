<?php
//
include('pdoBD.php');
global $conn;
//
$sql = file_get_contents("sql/truncate.sql");
$conn->exec($sql);
//
$file_reset = 'https://filrouge.uha4point0.fr/V2/reset/basketball';
$data_reset = file_get_contents($file_reset);
$array_reset = json_decode($data_reset);
$couleurs = array();
//
    foreach($array_reset->apiData->equipes as $equipes){
        $id = (int) strip_tags($equipes->id);
        $nom = (string) strip_tags($equipes->nom);
        $localisations = (string) strip_tags($equipes->localisations);
        $division = (string) strip_tags($equipes->division);
        $creation = (string) strip_tags($equipes->creation);
        foreach($equipes->couleurs as $color){
            if(!in_array($color, $couleurs)){
                array_push($couleurs, $color);
                $stmt = $conn->prepare("INSERT INTO couleurs(nom) VALUES (:nom);");
                $stmt->bindParam(':nom', $color, PDO::PARAM_STR);
                $stmt->execute();
            }
        }
        $logo = (string) strip_tags($equipes->logo);
        $stmt = $conn->prepare("INSERT INTO equipes(nom, localisations, division, creation, logo) VALUES (:nom, :localisations, :division, :creation, :logo);");
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':localisations', $localisations, PDO::PARAM_STR);
        $stmt->bindParam(':division', $division, PDO::PARAM_STR);
        $stmt->bindParam(':creation', $creation, PDO::PARAM_STR);
        $stmt->bindParam(':logo', $logo, PDO::PARAM_STR);
        $stmt->execute();
    }
//
    $sql = "SELECT * FROM couleurs;";
    $result = $conn->query($sql);
    $data_couleur = $result->fetchAll(PDO::FETCH_ASSOC);
    foreach($array_reset->apiData->equipes as $equipes){
        $id_equipe = (int) strip_tags($equipes->id);
        foreach($equipes->couleurs as $couleur){
            foreach($data_couleur as $data){
                $id_couleur = (int) strip_tags($data['id']);
                if(strip_tags($data['nom']) == strip_tags($couleur)){
                    $stmt = $conn->prepare("INSERT INTO couleurs_equipes(id_couleur, id_equipe) VALUES (:id_couleur, :id_equipe);");
                    $stmt->bindParam(':id_couleur', $id_couleur, PDO::PARAM_INT);
                    $stmt->bindParam(':id_equipe', $id_equipe, PDO::PARAM_INT);
                    $stmt->execute();
                }
            }
        }
    }
//
    foreach($array_reset->apiData->joueurs as $joueurs){
        $id = (int) strip_tags($joueurs->id);
        $nom = (string) strip_tags($joueurs->nom);
        $position = (string) strip_tags($joueurs->position);
        $No = (int) strip_tags($joueurs->No);
        $equipe = (int) strip_tags($joueurs->equipe);
        $taille = (float) strip_tags($joueurs->taille);
        $poid = (int) strip_tags($joueurs->poid);
        $stmt = $conn->prepare("INSERT INTO joueurs(nom, position, No, equipe, taille, poid) VALUES (:nom, :position, :No, :equipe, :taille, :poid);");
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':position', $position, PDO::PARAM_STR);
        $stmt->bindParam(':No', $No, PDO::PARAM_INT);
        $stmt->bindParam(':equipe', $equipe, PDO::PARAM_INT);
        $stmt->bindParam(':taille', $taille, PDO::PARAM_STR);
        $stmt->bindParam(':poid', $poid, PDO::PARAM_INT);
        $stmt->execute();
    }
//
?>
<!-- EOF -->