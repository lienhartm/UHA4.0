<!-- lists.php -->
<!-- -->
<?php
  include('header.php');
  include('file.php');
  /**/
  $text = "";
  $list = (string) $_GET['list'];
    switch($list){
      /* list equipes */
      case 'equipes':
        $text = "<h1 class='list_equipes'>Equipes</h1><section class='list_equipes'>";
        $list_equipes = array();
        $list_logo = array();
        for($number_equipes = 0; $number_equipes < count($array_equipes); $number_equipes++){
            array_push($list_equipes, $array_equipes[$number_equipes]->id = $array_equipes[$number_equipes]->nom);
            array_push($list_logo,$array_equipes[$number_equipes]->id = $array_equipes[$number_equipes]->logo);
        }
        asort($list_equipes);
        foreach($list_equipes as $key_equipe => $value_equipe){
            foreach($list_logo as $key_logo => $value_logo){
                if($key_equipe == $key_logo){
                  $text .= "<a href='details.php?detail=equipe&id=".strip_tags($value_equipe)."' class='shadow'>"
                  ."<figure class='list'>"
                  ."<img src='".strip_tags($value_logo)."' alt='".strip_tags($value_equipe)."'>"
                  ."<figcaption>".strip_tags($value_equipe)."</figcaption>"
                  ."</figure></a>";
                }
            }
        }
        echo $text."</section>";
        /* return $array_equipes[$number_equipes]->id */
        break;
      /* list joueurs */
      case 'joueurs':
        $text = "<h1 class='list_joueurs'>Joueurs</h1><section class='list_joueurs'>";
        $list_joueurs = array();
	      foreach($array_joueurs as $joueur){
            array_push($list_joueurs,$joueur->nom);
        }
        sort($list_joueurs);
        $first = "";
        foreach($list_joueurs as $nom_joueur){
          if($nom_joueur[0] > $first){
            $first = $nom_joueur[0];
            $text .= "<h2>".$first."</h2><hr>";
          }
            $text .= "<a href='details.php?detail=joueur&id=".strip_tags($nom_joueur)."' class='padding'>".strip_tags($nom_joueur)."</a><br>";
        }
        echo $text."</section>";
        /* return $array_joueurs[$number_joueurs]->id */
        break;
    }
    /**/
  include('footer.php');
?>
<!-- -->
