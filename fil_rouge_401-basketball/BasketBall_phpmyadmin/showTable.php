<?php

include('header.php');
include('pdoBD.php');
global $conn;

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if(isset($_GET['table'])){ $table = (string) $_GET['table']; } else { $table = ''; }

$stmt = $conn->prepare("SELECT * FROM $table ORDER BY id ASC;");

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<table>
<?php foreach($result as $row): ?>
    <tr>
    <?php foreach($row as $fields => $val): ?>
        <th>
            <?= $fields ?>
        </th>
    <?php endforeach; ?>
        <th>modifier</th>
        <th>effacer</th>
    <tr>
<?php break; endforeach; ?>
<?php foreach($result as $row): ?>
    <tr>
    <?php foreach($row as $fields => $val): ?>
        <td>
            <?= $val ?>
        </td>
    <?php endforeach; ?>
        <td>
            <a href='update<?= $table ?>.php?id=<?= $row['id'] ?>'>modifier</a></td><td><a href='delete.php?table=<?= $table ?>&id=<?= $row['id'] ?>'>effacer</a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>
<a href='add<?= $table ?>.php'>Ajouter des donnees</a>

<?php include('footer.php'); ?>