<?php include('header.php'); ?>

<section class='add'>
    <form method="post" action="addequipes.php">
        <fieldset>
            <legend>Ajouter une equipe</legend>
                <label for='nom'>Nom</label>
                    <input id='nom' name="nom" type="text" size="20" value="" /><br>
                <label for='localisations'>Localisation</label>
                    <input id='localisations' name="localisations" size="50" value="" /><br>
                <label for='division' >Division</label>
                    <input id='division' name="division" size="20" value="" /><br>
                <label for='creation'>Creation</label>
                    <input id='creation' name="creation" size="20" value="" /><br>
                <label for='logo'>Logo</label>
                    <input id='logo' name="logo" size="100" value="" /><br>
                <input type="submit" name="addEquipe">
        </fieldset>
    </form>
</section>

<?php

    include('footer.php');
    
    include('../Connection/pdoBD.php');
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO equipes(nom, localisations, division, creation, logo) VALUES (:nom, :localisations, :division, :creation, :logo);");

    $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindParam(':localisations', $localisations, PDO::PARAM_STR);
    $stmt->bindParam(':division', $division, PDO::PARAM_STR);
    $stmt->bindParam(':creation', $creation, PDO::PARAM_STR);
    $stmt->bindParam(':logo', $logo, PDO::PARAM_STR);
    
    if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }
    if(isset($_POST['localisations'])){ $localisations = (string) $_POST['localisations']; } else { $localisations = ''; }
    if(isset($_POST['division'])){ $division = (string) $_POST['division']; } else { $division = ''; }
    if(isset($_POST['creation'])){ $creation = (string) $_POST['creation']; } else { $creation = ''; }
    if(isset($_POST['logo'])){ $logo = (string) $_POST['logo']; } else { $logo = ''; }

    $stmt->execute();
    
    $conn = null;
    
?>
