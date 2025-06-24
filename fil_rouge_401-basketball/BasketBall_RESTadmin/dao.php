<?php

$servername = "localhost";
$username = "lienhart";
$password = "password";
$dbname = "basketball";

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>