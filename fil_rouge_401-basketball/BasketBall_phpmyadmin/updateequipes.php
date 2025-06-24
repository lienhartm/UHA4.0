<?php


include('header.php');
include('pdoBD.php');

global $conn;

$stmt = $conn->prepare("SELECT * FROM equipes WHERE id = :id;");

if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$conn = null;

?>

<section class='update'>
    <form method='post' action='updateequipesBD.php'>
        <label for='id'>id</label>
            <input type='text' id='id' value='<?= $result['id'] ?>' name='id'>
        <label for='nom'>nom</label>
            <input type='text' id='nom' value='<?= $result['nom'] ?>' name='nom'>
        <label for='localisations'>localisations</label>
            <input type='text' id='localisations' value='<?= $result['localisations'] ?>' name='localisations'>
        <label for='division'>division</label>
            <input type='text' id='divison' value='<?= $result['division'] ?>' name='division'>
        <label for='creation'>creation</label>
            <input type='text' id='creation' value='<?= $result['creation'] ?>' name='creation'>
        <label for='logo'>logo</label>
            <input type='text' id='logo' value='<?= $result['logo'] ?>' name='logo'>
        <input type='submit' name='table'>
    </form>
</section>

<?php

include('footer.php');

?>