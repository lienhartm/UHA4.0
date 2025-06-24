<!-- details.php -->
<?php

    require_once './mySQL/dao.php';
    include('header.php');
    $detail = $_GET['detail'];

    switch($detail){
        case 'equipe':
            if(isset($_GET['id'])){$id_equipe = (int) $_GET['id'];} else { $id = '';}
            $pdo = new DAO();
            $requete1 = "SELECT * FROM equipes ORDER BY nom ASC";
            $requete2= "SELECT * FROM joueurs ORDER BY nom ASC";
            $details_equipes = $pdo->executeRequest($requete1);
            $lists_joueurs = $pdo->executeRequest($requete2);

        ?>

            <section class='detail_equipe'>

        <?php

            foreach($details_equipes->fetchAll() as $equipe){
                if($id_equipe == $equipe['id']){

        ?>
            
            	<figure class='detail_equipe <?= str_replace(' ', '', $equipe['nom']) ?>'><img src='<?= $equipe['logo'] ?>' alt='<?= $equipe['nom'] ?>'><figcaption class='detail_equipe'><?= $equipe['nom'] ?></figcaption></figure><article class='description_equipe'><h2 class='description_equipe'><?= $equipe['nom'] ?></h2><p><b>Nom: </b><?= $equipe['nom'] ?></p><p><b>Localisations: </b><?= $equipe['localisations'] ?></p><p><b>Division: </b><?= $equipe['division'] ?></p><p><b>Fondation: </b><?= $equipe['creation'] ?></p></article><article class='enum_joueur'><h2 class='enum_joueur'>Joueurs:</h2><div class='enum_joueur'>

        <?php
                }
            }
            foreach($lists_joueurs as $joueur){
                if($joueur['equipe'] == $id_equipe){
        ?>

	            <p><a href='details.php?detail=joueur&id=<?= $joueur['id'] ?>' class='link'><?= $joueur['nom'] ?></a></p>

        <?php
                }
            }
        ?>

            </div></article></section>

        <?php

            break;
        
        case 'joueur':
            if(isset($_GET['id'])){$id_joueur = (int) $_GET['id'];} else {$id_joueur = '';}
            $pdo = new DAO();
            $requete1 = "SELECT * FROM joueurs ORDER BY nom ASC";
            $requete2 = "SELECT * FROM equipes ORDER BY nom ASC";
            $details_joueurs = $pdo->executeRequest($requete1);
            $nom_equipe = $pdo->executeRequest($requete2);

        ?>

            <section class='detail_joueur'>

        <?php

            foreach($details_joueurs->fetchAll() as $joueur){
                if($id_joueur == $joueur['id']){
                    foreach($nom_equipe->fetchAll() as $equipe){
                        if($joueur['equipe'] == $equipe['id']){
    
        ?>

            <div class='section_joueur'><figure class='figure_joueur <?= str_replace(' ', '',$equipe['nom']) ?>'><img src='<?= $equipe['logo'] ?>' alt='<?= $equipe['nom'] ?>' class='figure_joueur'><figcaption class='figure_joueur'><?= str_replace(',', '', explode(" ",$joueur['nom'])[0]) ?><br><?= $joueur['No'] ?></figcaption></figure><article class='article_joueur'><h2 class='nom_joueur'><?= $joueur['nom'] ?></h2><p><b>Nom: </b><?= $joueur['nom'] ?></p><p><b>Numero: </b><?= $joueur['No'] ?></p><p><b>Position: </b><?= $joueur['position'] ?></p><p><b>Equipe: </b><a href='details.php?detail=equipe&id=<?= $equipe['id'] ?>' class='link'><?= $equipe['nom'] ?></a></p>

        <?php
                        }
                    }
                }
            }
            break;
        default:
    }

    include('footer.php');

?>
