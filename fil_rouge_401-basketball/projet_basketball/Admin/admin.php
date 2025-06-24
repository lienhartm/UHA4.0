<?php

include('header.php');

echo "<form method='post' action='access.php'>"
    ."<fieldset>"
    ."<label for='identifiant'>Identifiant :</label><br>"
    ."<input type='text' id='identifiant' value='' name='identifiant' required><br>"
    ."<label for='pass'>Mot de passe :</label><br>"
    ."<input type='text' id='pass' value='' name='pass' required><br>"
    ."<label for='passwd'>Mot de passe :</label><br>"
    ."<input type='text' id='passwd' value='' name='passwd' required><br>"
    ."<br><br>"
    ."<input type='submit' value='Valide'>"
    ."</fieldset>"
    ."</form>";

include('footer.php');

?>

