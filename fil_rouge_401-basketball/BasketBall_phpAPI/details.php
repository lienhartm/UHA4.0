<?php 
include('file.php');
include('header.php');
/**/
if(isset($_GET['detail'])){$detail = (string) $_GET['detail'];} else {$detail = '';}
switch($detail){
    case 'equipe':
        $text = "<section class='detail_equipe'>";
        // LISTE DETAILS EQUIPE-S
        if(isset($_GET['id'])){$nom_equipe = (int) $_GET['id'];} else {$nom_equipe = '';}
        foreach($array_equipes as $data){
	        foreach($data as $equipe){
		        if($equipe->nom == $nom_equipe){
			        $equipe_id = $equipe->id;
        		    $text .= "<figure class='detail_equipe ".str_replace(' ', '', $equipe->nom)."'>"
                            ."<img src='".$equipe->logo."' alt='".$equipe->nom."'>"
                            ."<figcaption class='detail_equipe'>".$equipe->nom."</figcaption>"
                            ."</figure><article class='description_equipe'>"
                            ."<h2 class='description_equipe'>".$equipe->nom."</h2>"
                            ."<p><b>Nom: </b>".$equipe->nom."</p>"
                            ."<p><b>Localisations: </b>".$equipe->localisations."</p>"
                            ."<p><b>Division: </b>".$equipe->division."</p>"
                            ."<p><b>Fondation: </b>".$equipe->creation."</p>"
                            ."</article>"
                            ."<article class='enum_joueur'>"
                            ."<h2 class='enum_joueur'>Joueurs:</h2>"
                            ."<div class='enum_joueur'>"; 
		        }
            }
	    }
    foreach($array_joueurs as $data){
        
        foreach($data as $joueur){
            if($joueur->equipe == $equipe_id){
                $text .= "<p><a href='details.php?detail=joueur&id=".$joueur->nom."' class='link'>".$joueur->nom."</a></p>"; 
            }
        }
    }
        echo $text."</div></article></section>";
        /* return $array_joueurs[$number_joueurs]-id */
        break;
    case 'joueur':
        $text = "<section class='detail_joueur'>";
        // LISTE DETAILS JOUEUR-S
        if(isset($_GET['id'])){$nom_joueur = (int) $_GET['id'];} else {$nom_joueur = '';}
        foreach($array_joueurs as $data){   
            foreach($data as $joueur){
                if($joueur->nom == $nom_joueur){
                    foreach($array_equipes as $data){
                        foreach($data as $equipe){
                            if($equipe->id == $joueur->equipe){
                                $text .= "<div class='section_joueur'>"
                                        ."<figure class='figure_joueur ".str_replace(' ', '',$equipe->nom)."'>"
                                        ."<img src='".$equipe->logo."' alt='".$equipe->nom."' class='figure_joueur'>"
                                        ."<figcaption class='figure_joueur'>".str_replace(',', '', explode(" ",$joueur->nom)[0])."<br>".$joueur->No."</figcaption>"
                                        ."</figure><article class='article_joueur'>"
                                        ."<h2 class='nom_joueur'>".$joueur->nom."</h2>"
                                        ."<p><b>Nom: </b>".$joueur->nom."</p>"
                                        ."<p><b>Numero: </b>".$joueur->No."</p>"
                                        ."<p><b>Position: </b>".$joueur->position."</p>"
                                        ."<p><b>Equipe: </b><a href='details.php?detail=equipe&id=".str_replace(",","",$equipe->nom)."' class='link'>".$equipe->nom."</a></p>";
                            }
                        }   
                    }
                }
            }
        }
        echo $text."</div></article></section>";
        /* return $array_equipes[$number_joueurs]->id */
        break;
    default:
        //
        break;
}
/**/
include('footer.php');
?>
