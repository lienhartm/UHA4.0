<?php

include('header.php');
include('pdoBD.php');
global $conn;

$stmt = $conn->prepare("SELECT * FROM courriels WHERE id = :id;");

if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$conn = null;

?>

<section class='update'>
    <form method='post' action='updatecourrielsBD.php'>
        <label for='id'>id</label>
            <input type='text' id='id' value='<?= $result['id'] ?>' name='id'>
        <label for='courriel'>courriel</label>
            <input type='text' id='courriel' value='<?= $result['courriel'] ?>' name='courriel'>
        <input type='submit' name='table'>
    </form>
</section>

<?php

include('footer.php');

?>