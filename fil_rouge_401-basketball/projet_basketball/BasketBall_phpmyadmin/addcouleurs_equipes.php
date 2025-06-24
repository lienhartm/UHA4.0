<?php 

include('header.php'); 
include('../Connection/pdoBD.php');
global $conn;

if(isset($_GET['table'])){ $table = (string) $_GET['table']; } else { $table = ''; }

$stmt = $conn->prepare("SELECT equipes.id, equipes.nom FROM equipes ORDER BY nom ASC;");

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<section class='add'>
    <form method='post' action='addcouleurs_equipes.php'>
        <label for='id_couleur'>id_couleur</label>
            <input type='text' id='id_couleur' value='' name='id_couleur'>
        <label for='id_equipe'>id_equipe</label>
            <input type='text' id='id_equipe' value='' name='id_equipe'>
        <input type='submit' name='table'>
    </form>
</section>       

<?php

include('footer.php');

$stmt = $conn->prepare("INSERT INTO couleurs_equipes(id_couleur, id_equipe) VALUES (:id_couleur, :id_equipe);");

$stmt->bindParam(':id_couleur', $id_couleur, PDO::PARAM_STR);
$stmt->bindParam(':id_equipe', $id_equipe, PDO::PARAM_INT);

if(isset($_POST['id_couleur'])){ $id_couleur = (string) $_POST['id_couleur']; } else { $id_couleur = ''; }
if(isset($_POST['id_equipe'])){ $id_equipe = (int) $_POST['id_equipe']; } else { $id_equipe = ''; }

$stmt->execute();

$conn = null;

?>
