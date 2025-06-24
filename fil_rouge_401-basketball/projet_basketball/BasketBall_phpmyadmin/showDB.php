<?php

include('header.php');
include('../Connection/pdoSBD.php');
global $conn;

$stmt = $conn->prepare("SHOW databases;");

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$database_name = '';
foreach($result as $database)
    if($database['Database'] == 'basketball'){
        $database_name = 'basketball';
        ?>
        <table>
            <tr>
                <th>
                    <?= $database_name ?>
                </th>
            </tr>
        <?php    

$conn = null;

include('../Connection/pdoBD.php');

        $stmt = $conn->prepare("SHOW tables;");

        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 

        foreach($result as $table){
            echo "<tr><td><a href='showTable.php?table=".$table['Tables_in_basketball']."'  >".$table['Tables_in_basketball']."</a></td></tr>";
        }

        ?>

</table>

<?php

        break;
    }


$conn = null;
include('footer.php');

?>