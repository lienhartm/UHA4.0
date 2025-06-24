<!-- mail.php -->
<?php

// recuperation des variables
$nom = $_POST['nom'];
$email = $_POST['email'];
$sujet = $_POST['sujet'];
$message = $_POST['message'];

echo "<h2>Courriel :</h2>";
echo "<br>";
echo $nom;
echo "<br>";
echo $email;
echo "<br>";
echo $sujet;
echo "<br>";
echo $message;

?>