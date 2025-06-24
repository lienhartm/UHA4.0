<?php

include('pdoBD.php');

if(isset($_GET['table'])){ $table = (string) $_GET['table']; } else { $table = ''; }
if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }

$sql = "DELETE FROM $table WHERE id = $id;";

$conn->exec($sql);

header("Location: index.php");

$conn = null;

?>