<!-- details_equipe.php -->
<?php ob_start(); ?>

<section class='detail_equipe'>

<?php
	foreach($details_equipes as $equipe){
?>

<figure class='detail_equipe <?= str_replace(' ', '', $equipe['nom']) ?>'>
        <img src='<?= $equipe['logo'] ?>' alt='<?= $equipe['nom'] ?>'>
        <figcaption class='detail_equipe'><?= $equipe['nom'] ?></figcaption>
</figure>
<article class='description_equipe'>
        <h2 class='description_equipe'><?= $equipe['nom'] ?></h2>
        <p><b>Nom: </b><?= $equipe['nom'] ?></p>
        <p><b>Localisations: </b><?= $equipe['localisations'] ?></p>
        <p><b>Division: </b><?= $equipe['division'] ?></p>
        <p><b>Fondation: </b><?= $equipe['creation'] ?></p>
</article>
<article class='enum_joueur'>
        <h2 class='enum_joueur'>Joueurs:</h2>
        <div class='enum_joueur'>

<?php
                }
                
        foreach($lists_joueurs as $joueur){
?>

<p><a href='index.php?action=detailJoueur&id=<?= $joueur['id'] ?>' class='link'><?= $joueur['nom'] ?></a></p> 

<?php
            }
?>

</div></article></section>

<?php
// export
$contenu = ob_get_clean();

require 'template.php';

?>