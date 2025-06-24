<?php

include('header.php');
include('../Connection/pdoBD.php');

global $conn;

$stmt = $conn->prepare("UPDATE couleurs SET nom = :nom WHERE id = :id;");

if(isset($_POST['id'])){ $id = (int) $_POST['id']; } else { $id = ''; }
if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':nom', $nom, PDO::PARAM_STR);

if($stmt->execute()){
    echo "<script>alert('Couleurs modifie avec succes');</script>";
} else {
    "Erreur!";
}

$conn = null;

include('footer.php');

?>