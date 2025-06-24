<!-- index.php -->
<?php

require_once "controlleur/Newsletter.php";
require_once "controlleur/Details.php";
require_once "controlleur/Index.php";
require_once "controlleur/Lists.php";

$newsletter = new Newsletter();
$details = new Details();
$index = new Index();
$lists = new Lists();

if(isset($_GET['action'])){
    $action = $_GET['action'];
    $id = (isset($_GET['id'])) ? $_GET['id'] : '';

    switch($action){
        case 'listEquipe': $lists->listEquipe(); break;
        case 'listJoueur': $lists->listJoueur(); break;
        case 'detailEquipe': $details->detailEquipe($id); break;
        case 'detailJoueur': $details->detailJoueur($id); break;
        case 'newsletter': $newsletter->abonement(); break;
        default:
    } 
} else {
    $index->index();
}

?>