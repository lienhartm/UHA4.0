<!-- details_joueur.php -->
<?php ob_start(); ?>

<section class='detail_joueur'>

<?php
    foreach($details_joueurs as $joueur){
        foreach($equipes as $equipe){
?>

<div class='section_joueur'>
    <figure class='figure_joueur <?= str_replace(' ', '',$equipe['nom']) ?>'>
        <img src='<?= $equipe['logo'] ?>' alt='<?= $equipe['nom'] ?>' class='figure_joueur'>
        <figcaption class='figure_joueur'><?= str_replace(',', '', explode(" ",$joueur['nom'])[0]) ?><br><?= $joueur['No'] ?></figcaption>
    </figure>
    <article class='article_joueur'>
        <h2 class='nom_joueur'><?= $joueur['nom'] ?></h2>
        <p><b>Nom: </b><?= $joueur['nom'] ?></p>
        <p><b>Numero: </b><?= $joueur['No'] ?></p>
        <p><b>Position: </b><?= $joueur['position'] ?></p>
        <p><b>Equipe: </b><a href='index.php?action=detailEquipe&id=<?= $equipe['id'] ?>' class='link'><?= $equipe['nom'] ?></a></p>
    </article>
</div>

<?php
        }
    }
 
// export
$contenu = ob_get_clean();

require 'template.php';

?>