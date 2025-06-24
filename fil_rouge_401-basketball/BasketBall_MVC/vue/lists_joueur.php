<!-- lists_joueur.php -->
<?php ob_start(); ?>

<h1 class='list_joueurs'>Joueurs</h1><section class='list_joueurs'>

<?php

  $first = '';
  foreach($lists_joueurs as $joueurs){
    if($joueurs['nom'][0] > $first){
      $first = $joueurs['nom'][0];

?>

<h2><?= $first ?></h2><hr>

<?php } ?>

<a href='index.php?action=detailJoueur&id=<?= $joueurs['id'] ?>' class='padding'><?= $joueurs['nom'] ?></a><br>

<?php } ?>

</section>

<?php

  $contenu = ob_get_clean();

  require 'template.php';

?>