<?php

include('header.php');
include('../Connection/pdoBD.php');

global $conn;

$stmt = $conn->prepare("SELECT * FROM couleurs WHERE id = :id;");

if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$conn = null;

?>
<section class='update'>
    <form method='post' action='updatecouleursBD.php'>
        <label for='id'>id</label>
            <input type='text' id='id' value='<?= $result['id'] ?>' name='id'>
        <label for='nom'>nom</label>
            <input type='text' id='nom' value='<?= $result['nom'] ?>' name='nom'>
        <input type='submit' name='table'>
    </form>
</section>

<?php

include('footer.php');

?>






