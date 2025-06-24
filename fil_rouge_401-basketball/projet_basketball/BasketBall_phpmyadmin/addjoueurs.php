<?php include('header.php'); ?>

<section  class='add'>
    <form method="post" action="addjoueurs.php">
        <fieldset>
            <legend>Ajouter un joueur</legend>
            <label for='nom'>Nom</label>
                <input id='nom' name="nom" type="text" size="50" value="" /><br>
            <label for='position'>Position</label>
                <input id='position' name="position" type="text" size="5" value="" /><br>
            <label for='No'>No</label>
                <input id='No' name="No" type="number" value="" /><br>
            <label for='equipe'>Equipe</label>
                <input id='equipe' name="equipe" type="text" size="10" value="" /><br>
            <label for='taille'>Taille</label>
                <input id='taille' name="taille" type="text" size="10" value="" /><br>
            <label for='poid'>Poid</label>
                <input id='poid' name="poid" type="text" size="10" value="" /><br>
            <input type="submit" name="addJoueur">
        </fieldset>
    </form>
</section>

<?php

    include('footer.php');
    
    include('../Connection/pdoBD.php');
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO joueurs(nom, position, No, equipe, taille, poid) VALUES (:nom, :position, :No, :equipe, :taille, :poid);");

    $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindParam(':position', $position, PDO::PARAM_STR);
    $stmt->bindParam(':No', $No, PDO::PARAM_INT);
    $stmt->bindParam(':equipe', $equipe, PDO::PARAM_INT);
    $stmt->bindParam(':taille', $taille, PDO::PARAM_STR);
    $stmt->bindParam(':poid', $poid, PDO::PARAM_INT);
    
    if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }
    if(isset($_POST['position'])){ $position = (string) $_POST['position']; } else { $position = ''; }
    if(isset($_POST['No'])){ $No = (int) $_POST['No']; } else { $No = ''; }
    if(isset($_POST['equipe'])){ $equipe = (int) $_POST['equipe']; } else { $equipe = ''; }
    if(isset($_POST['taille'])){ $taille = (float) $_POST['taille']; } else { $taille = ''; }
    if(isset($_POST['poid'])){ $poid = (int) $_POST['poid']; } else { $poid = ''; }
    
    $stmt->execute();

    $conn = null;

?>
