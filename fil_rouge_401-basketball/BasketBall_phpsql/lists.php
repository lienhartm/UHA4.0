<!-- lists.php -->
<!-- -->
<?php

  require_once './mySQL/dao.php';
  include('header.php');

  $text = "";
  if(isset($_GET['list'])){$list = (string) $_GET['list'];} else { $list = '';}

  switch($list){
    /* list equipes */
    case 'equipes':

      $pdo = new DAO();
      $requete = "SELECT id, nom, logo FROM equipes ORDER BY nom ASC";
      $lists_equipes = $pdo->executeRequest($requete);

      ?>          

      <h1 class='list_equipes'>Equipes</h1><section class='list_equipes'>

      <?php foreach($lists_equipes as $row_equipe){ ?>

      <a href='details.php?detail=equipe&id=<?= $row_equipe['id'] ?>' class='shadow'><figure class='list'><img src='<?= $row_equipe['logo'] ?>' alt='<?= $row_equipe['nom'] ?>'><figcaption><?= $row_equipe['nom'] ?></figcaption></figure></a>

      <?php } ?>

      </section>

      <?php
      
      break;
      /* list joueurs */
    case 'joueurs':

        $pdo = new DAO();
        $requete = "SELECT id, nom FROM joueurs ORDER BY nom ASC";
        $lists_joueurs = $pdo->executeRequest($requete);

        ?>

        <h1 class='list_joueurs'>Joueurs</h1><section class='list_joueurs'>

        <?php

          $first = "";          
          foreach($lists_joueurs as $row_joueur){
            if($row_joueur['nom'][0] > $first){
              $first = $row_joueur['nom'][0];
          
        ?>
      
        <h2><?= $first ?></h2><hr>
      
        <?php } ?>

        <a href='details.php?detail=joueur&id=<?= $row_joueur['id'] ?>' class='padding'><?= $row_joueur['nom'] ?></a><br>
        
        <?php } ?>

        </section>

        <?php break; } include('footer.php'); ?>
<!-- -->
