<!-- details.php -->
<?php 
include('file.php');
include('header.php');
/**/
$detail = (string) strip_tags($_GET['detail']);
switch($detail){
    case 'equipe':
        $text = "<section class='detail_equipe'>";
        // LISTE DETAILS EQUIPE-S
        $nom_equipe = (string) strip_tags($_GET['id']);
	foreach($array_equipes as $equipe){
		if($equipe->nom == $nom_equipe){
			$equipe_id = $equipe->id;
                $text .= "<figure class='detail_equipe ".str_replace(' ', '', strip_tags(htmlspecialchars(htmlentities($equipe->nom))))."'>"
                        ."<img src='".$equipe->logo."' alt='".strip_tags(htmlspecialchars($equipe->nom))."'>"
                        ."<figcaption class='detail_equipe'>".strip_tags(htmlspecialchars($equipe->nom))."</figcaption>"
                        ."</figure>"
                        ."<article class='description_equipe'>"
                        ."<h2 class='description_equipe'>".strip_tags(htmlspecialchars($equipe->nom))."</h2>"
                        ."<p><b>Nom: </b>".strip_tags(htmlspecialchars($equipe->nom))."</p>"
                        ."<p><b>Localisations: </b>".strip_tags(htmlspecialchars($equipe->localisations))."</p>"
                        ."<p><b>Division: </b>".strip_tags(htmlspecialchars($equipe->division))."</p>"
                        ."<p><b>Fondation: </b>".strip_tags(htmlspecialchars($equipe->creation))."</p>"
                        ."</article>"
                        ."<article class='enum_joueur'>"
                        ."<h2 class='enum_joueur'>Joueurs:</h2>"
                        ."<div class='enum_joueur'>";
		}
	}
        foreach($array_joueurs as $joueur){
                if($joueur->equipe == $equipe_id){
	                $text .= "<p><a href='details.php?detail=joueur&id=".strip_tags($joueur->nom)."' class='link'>".strip_tags($joueur->nom)."</a></p>"; 
                }
            }
        echo $text."</div></article></section>";
        /* return $array_joueurs[$number_joueurs]-id */
        break;
    case 'joueur':
        $text = "<section class='detail_joueur'>";
        // LISTE DETAILS JOUEUR-S
        $nom_joueur = (string) strip_tags($_GET['id']);
        foreach($array_joueurs as $joueur){
            if($joueur->nom == $nom_joueur){
                foreach($array_equipes as $equipe){
                    if($equipe->id == $joueur->equipe){
                        $text .= "<div class='section_joueur'>"
                            ."<figure class='figure_joueur ".str_replace(' ', '',strip_tags($equipe->nom))."'>"
                            ."<img src='".strip_tags($equipe->logo)."' alt='".strip_tags($equipe->nom)."' class='figure_joueur'>"
                            ."<figcaption class='figure_joueur'>".str_replace(',', '', explode(" ",$joueur->nom)[0])."<br>".strip_tags($joueur->No)."</figcaption>"
                            ."</figure><article class='article_joueur'>"
                            ."<h2 class='nom_joueur'>".strip_tags($joueur->nom)."</h2>"
                            ."<p><b>Nom: </b>".strip_tags($joueur->nom)."</p>"
                            ."<p><b>Numero: </b>".strip_tags($joueur->No)."</p>"
                            ."<p><b>Position: </b>".strip_tags($joueur->position)."</p>"
                            ."<p><b>Equipe: </b>"
                            ."<a href='details.php?detail=equipe&id=".str_replace(",","",strip_tags($equipe->nom))."' class='link'>".strip_tags($equipe->nom)."</a>"
                            ."</p>";
                    }
                }
            }
        }
        echo $text;
        /* return $array_equipes[$number_joueurs]->id */
        break;
    default:
        //
        break;
}
/**/
include('footer.php');
?>
