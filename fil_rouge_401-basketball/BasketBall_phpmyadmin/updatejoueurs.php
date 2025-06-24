<?php

include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("select * from joueurs where id = :id;");

if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$conn = null;

?>

<section class='update'>
    <form method='post' action='updatejoueursBD.php'>
        <label for='id'>id</label>
            <input type='text' id='id' value='<?= $result['id'] ?>' name='id'>
        <label for='nom'>nom</label>
            <input type='text' id='nom' value='<?= $result['nom'] ?>' name='nom'>
        <label for='position'>position</label>
            <input type='text' id='position' value='<?= $result['position'] ?>' name='position'>
        <label for='No'>No</label>
            <input type='text' id='No' value='<?= $result['No'] ?>' name='No'>
        <label for='equipe'>equipe</label>
            <input type='text' id='equipe' value='<?= $result['equipe'] ?>' name='equipe'>
        <label for='taille'>taille</label>
            <input type='text' id='taille' value='<?= $result['taille'] ?>' name='taille'>
        <label for='poid'>poid</label>
            <input type='text' id='poid' value='<?= $result['poid'] ?>' name='poid'>
        <input type='submit' name='table'>
    </form>
</section>

<?php

include('footer.php');

?>