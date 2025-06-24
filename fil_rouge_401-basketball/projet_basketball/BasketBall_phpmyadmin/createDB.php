<?php

include('../Connection/pdoSBD.php');

global $conn;

$sql = file_get_contents("sql/create.sql");

$conn->exec($sql);

header("Location: index.php");

$conn = null;

?>