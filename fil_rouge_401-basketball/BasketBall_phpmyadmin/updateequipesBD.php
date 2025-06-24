<?php

include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("UPDATE equipes SET nom = :nom, localisations = :localisations, division = :division, creation = :creation, logo = :logo WHERE id = :id;");

if(isset($_POST['id'])){ $id = (int) $_POST['id']; } else { $id = ''; }
if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }
if(isset($_POST['localisations'])){ $localisations = (string) $_POST['localisations']; } else { $localisations = ''; }
if(isset($_POST['division'])){ $division = (string) $_POST['division']; } else { $division = ''; }
if(isset($_POST['creation'])){ $creation = (string) $_POST['creation']; } else { $creation = ''; }
if(isset($_POST['logo'])){ $logo = (string) $_POST['logo']; } else { $logo = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
$stmt->bindParam(':localisations', $localisations, PDO::PARAM_STR);
$stmt->bindParam(':division', $division, PDO::PARAM_STR);
$stmt->bindParam(':creation', $creation, PDO::PARAM_STR);
$stmt->bindParam(':logo', $logo, PDO::PARAM_STR);

if($stmt->execute()){
    echo "<script>alert('Equipe modifie avec succes');</script>";
} else {
    "Erreur!";
}

$conn = null;

include('footer.php');

?>