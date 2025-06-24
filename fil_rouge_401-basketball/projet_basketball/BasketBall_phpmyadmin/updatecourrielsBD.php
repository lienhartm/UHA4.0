<?php

include('header.php');
include('../Connection/pdoBD.php');

global $conn;

$stmt = $conn->prepare("UPDATE courriels SET courriel = :courriel WHERE id = :id;");

if(isset($_POST['id'])){ $id = (int) $_POST['id']; } else { $id = ''; }
if(isset($_POST['courriel'])){ $courriel = (string) $_POST['courriel']; } else { $courriel = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':courriel', $courriel, PDO::PARAM_STR);

if($stmt->execute()){
    echo "<script>alert('Courriel_equipes modifie avec succes');</script>";
} else {
    echo "Erreur!";
}

$conn = null;

include('footer.php');

?>