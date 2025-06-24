<?php

include('header.php');

$identifiant = '';

if(isset($_POST['identifiant'])){ $identifiant = $_POST['identifiant']; } else { $identifiant = ''; }
if(isset($_POST['pass'])){ $pass = $_POST['pass']; } else  { $pass = ''; }
if(isset($_POST['passwd'])){ $passwd = $_POST['passwd']; } else { $passwd = ''; }

include('../Connection/pdoSBD.php');

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("USE admin;");
$stmt->execute();

$stmt = $conn->prepare("SELECT * FROM user WHERE identifiant = :identifiant AND password = :passwd;");

$stmt->bindParam(':identifiant', $identifiant);
$stmt->bindParam(':passwd', $passwd);

$stmt->execute();

$enter = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $conn->prepare("SELECT * FROM user LIMIT 1 OFFSET 0;");

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

if($enter > 0 & $result > 0){
    if($enter['identifiant'] == $result['identifiant'] & $enter['password'] == $result['password']){

        echo "<script>window.location.assign('../BasketBall_phpmyadmin/');</script>"; //TODO : préféré la version php qui évite une deuxième requête serveur
    }
}

include('footer.php');

?>