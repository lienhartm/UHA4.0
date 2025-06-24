<?php

include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("SELECT * FROM couleurs_equipes WHERE id = :id;");

if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$conn = null;

?>

<section class='update'>
    <form method='post' action='updatecouleurs_equipesBD.php'>
        <label for='id'>id</label>
            <input type='text' id='id' value='<?= $result['id'] ?>' name='id'>
        <label for='id_couleur'>id_couleur</label>
            <input type='text' id='id_couleur' value='<?= $result['id_couleur'] ?>' name='id_couleur'>
        <label for='id_equipe'>id_equipe</label>
            <input type='text' id='id_equipe' value='<?= $result['id_equipe'] ?>' name='id_equipe'>
        <input type='submit' name='table'>
    </form>
</section>

<?php

include('footer.php');

?>

