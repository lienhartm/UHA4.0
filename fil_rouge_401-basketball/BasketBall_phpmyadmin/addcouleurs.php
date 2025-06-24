<?php 

include('header.php');

include('pdoBD.php');
global $conn;

if(isset($_GET['table'])){ $table = (string) $_GET['table']; } else { $table = ''; }

$stmt = $conn->prepare("SELECT equipes.id, equipes.nom FROM equipes ORDER BY nom ASC;");

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<section class='add'>
    <form method="post" action="addcouleurs.php">
        <label for='nom'>nom</label>
            <input type='text' id='nom' value='' name='nom'>
        <input type='submit' name='table'>
    </form>
</section>      

<?php

include('footer.php');

$stmt = $conn->prepare("INSERT INTO couleurs(nom) VALUES (:nom);");

$stmt->bindParam(':nom', $nom, PDO::PARAM_STR);

if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }

$stmt->execute();

$conn = null;

?>
