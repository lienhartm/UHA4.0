<?php

include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("UPDATE couleurs_equipes SET id_couleur = :id_couleur, id_equipe = :id_equipe WHERE id = :id;");

if(isset($_POST['id'])){ $id = (int) $_POST['id']; } else { $id = ''; }
if(isset($_POST['id_couleur'])){ $id_couleur = (int) $_POST['id_couleur']; } else { $id_couleur = ''; }
if(isset($_POST['id_equipe'])){ $id_equipe = (int) $_POST['id_equipe']; } else { $id_equipe = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':id_couleur', $id_couleur, PDO::PARAM_INT);
$stmt->bindParam(':id_equipe', $id_equipe, PDO::PARAM_INT);

if($stmt->execute()){
    echo "<script>alert('Couleurs_equipes modifie avec succes');</script>";
} else {
    "Erreur!";
}

$conn = null;

include('footer.php');

?>