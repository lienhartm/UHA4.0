<?php

include('pdoBD.php');

global $conn;

$sql = file_get_contents("sql/equipes.sql");
$conn->exec($sql);
        
$sql = file_get_contents("sql/couleurs.sql");
$conn->exec($sql);
            
$sql = file_get_contents("sql/couleurs_equipes.sql");
$conn->exec($sql);

$sql = file_get_contents("sql/joueurs.sql");
$conn->exec($sql);

$sql = file_get_contents("sql/courriels.sql");
$conn->exec($sql);

header("location: index.php");

$conn = null;

?>