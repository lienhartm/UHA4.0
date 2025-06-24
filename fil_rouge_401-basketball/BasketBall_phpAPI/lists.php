<?php
  include('header.php');
  include('file.php');
  /**/
  $text = "";
  if(isset($_GET['list'])){$list = (string) $_GET['list'];} else {$list = '';}
    switch($list){
      /* list equipes */
      case 'equipes':
        $text = "<h1 class='list_equipes'>Equipes</h1><section class='list_equipes'>";
        $list_equipes = array();
        $list_logo = array();
        foreach($array_equipes as $equipes){
          foreach($equipes as $data){
            array_push($list_equipes,$data->id = $data->nom);
            array_push($list_logo,$data->id = $data->logo);
          }
        }
        asort($list_equipes);
        foreach($list_equipes as $key_equipe => $value_equipe){
            foreach($list_logo as $key_logo => $value_logo){
                if($key_equipe == $key_logo){
                  $text .= "<a href='details.php?detail=equipe&id=".$value_equipe."' class='shadow'><figure class='list'><img src='".$value_logo."' alt='".$value_equipe."'><figcaption>".$value_equipe."</figcaption></figure></a>";
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
          foreach($joueur as $data){
            array_push($list_joueurs,$data->nom);
          }
        }
        sort($list_joueurs);
        $first = "";
        foreach($list_joueurs as $nom_joueur){
          if($nom_joueur[0] > $first){
            $first = $nom_joueur[0];
            $text .= "<h2>".$first."</h2><hr>";
          }
          $text .= "<a href='details.php?detail=joueur&id=".$nom_joueur."' class='padding'>".$nom_joueur."</a><br>";
        }
        echo $text."</section>";
        /* return $array_joueurs[$number_joueurs]->id */
        break;
    }
    /**/
  include('footer.php');
?>
<!-- -->
