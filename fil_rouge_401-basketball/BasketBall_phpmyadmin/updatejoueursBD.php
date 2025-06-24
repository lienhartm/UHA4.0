<?php

include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("UPDATE joueurs SET nom = :nom, position = :position, No = :No, equipe = :equipe, taille = :taille, poid = :poid WHERE id = :id;");

if(isset($_POST['id'])){ $id = (int) $_POST['id']; } else { $id = ''; }
if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }
if(isset($_POST['position'])){ $position = (string) $_POST['position']; } else { $position = ''; }
if(isset($_POST['No'])){ $No = (int) $_POST['No']; } else { $No = ''; }
if(isset($_POST['equipe'])){ $equipe = (int) $_POST['equipe']; } else { $equipe = ''; }
if(isset($_POST['taille'])){ $taille = (float) $_POST['taille']; } else { $taille = ''; }
if(isset($_POST['poid'])){ $poid = (int) $_POST['poid']; } else { $poid = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
$stmt->bindParam(':position', $position, PDO::PARAM_STR);
$stmt->bindParam(':No', $No, PDO::PARAM_STR);
$stmt->bindParam(':equipe', $equipe, PDO::PARAM_INT);
$stmt->bindParam(':taille', $taille, PDO::PARAM_STR);
$stmt->bindParam(':poid', $poid, PDO::PARAM_INT);

if($stmt->execute()){
    echo "<script>alert('Joueur modifie avec succes');</script>";
} else {
    echo "Erreur";
}

$conn = null;

?>