<!-- lists_equipe.php -->
<?php ob_start(); ?>

<h1 class='list_equipes'>Equipes</h1><section class='list_equipes'>

<?php

    foreach($lists_equipes as $equipes){

?>

<a href='index.php?action=detailEquipe&id=<?= $equipes['id'] ?>' class='shadow'><figure class='list'><img src='<?= $equipes['logo'] ?>' alt='<?= $equipes['nom'] ?>'><figcaption><?= $equipes['nom'] ?></figcaption></figure></a>

<?php 

    }

?>

</section>

<?php

    $contenu = ob_get_clean();
    require 'template.php';

?>