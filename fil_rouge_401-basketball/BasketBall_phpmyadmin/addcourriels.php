<?php include('header.php'); ?>

<section  class='add'>
    <form method="post" action="addcourriels.php">
        <fieldset>
            <legend>Ajouter un courriel</legend>
            <label>Courriel<input name="courriel" type="text" size="50" value=""></label>
            <input type="submit" name="addCourriel">
        </fieldset>
    </form>
</section>

<?php

    include('footer.php');

    include('pdoBD.php');

    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO courriels(courriel) VALUES (:courriel);");

    $stmt->bindParam(':courriel', $courriel, PDO::PARAM_STR);
    
    if(isset($_POST['courriel'])){ $courriel = (string) $_POST['courriel']; } else { $courriel = ''; }
    
    $stmt->execute();

    $conn = null;
    
?>
