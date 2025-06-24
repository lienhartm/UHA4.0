<?php

include('../Connection/pdoSBD.php');

global $conn;
$sql = file_get_contents("init.sql");
$conn->exec($sql);
header("location: ../index.php");
$conn = null;

?>