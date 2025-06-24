<?php

    include('dao.php');

    header('Content-Type: application/json');

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method){
        case 'POST':
            AddEquipe();
            break;
        case 'GET':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                GetEquipe($id);
            } else {
                GetEquipes();
            }
            break;
        case 'PUT':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                UppEquipe($id);
            }
            break;
        case 'DELETE':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                SuppEquipe($id);
            }
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;

    }

    function AddEquipe(){
        global $conn;
        
        if(isset($_GET['nom'])){$nom = (string) $_GET['nom'];} else {$nom ='';}
        if(isset($_GET['localisations'])){$localisations = (string) $_GET['localisations'];} else {$localisations = '';}
        if(isset($_GET['division'])){$division = (string) $_GET['division'];} else {$division = '';}
        if(isset($_GET['creation'])){$creation = (string) $_GET['creation'];} else {$creation = '';}
        if(isset($_GET['logo'])){$logo = (string) $_GET['logo'];} else {$logo = '';}

        $stmt = $conn->prepare("INSERT INTO equipes(nom, localisations, division, creation, logo) VALUES (:nom, :localisations, :division, :creation, :logo);");
        
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':localisations', $localisations, PDO::PARAM_STR);
        $stmt->bindParam(':division', $division, PDO::PARAM_STR);
        $stmt->bindParam(':creation', $creation, PDO::PARAM_STR);
        $stmt->bindParam(':logo', $logo, PDO::PARAM_STR);

        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Equipe ajoute avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }

    function GetEquipes(){
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM equipes ORDER BY nom;");
        $stmt->execute();
        $response = array();
        $response['equipes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function GetEquipe($id = 0){
        global $conn;
        if(isset($_GET['id'])){$id = (int) $_GET['id'];} else {$id = '';}
        if($id != 0){
            $stmt = $conn->prepare("SELECT * FROM equipes WHERE id = :id;");
            if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("SELECT * FROM equipes;");
        }
        $stmt->execute();
        $response = array();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function UppEquipe($id){
        global $conn;
        $stmt = $conn->prepare("UPDATE equipes SET nom = :nom, localisations = :localisations, division = :division, creation = :creation, logo = :logo WHERE id = :id;");

        if(isset($_GET['nom'])){ $nom = (string) $_GET['nom']; } else { $nom = ''; }
        if(isset($_GET['localisations'])){ $localisations = (string) $_GET['localisations']; } else { $localisations = ''; }
        if(isset($_GET['division'])){ $division = (string) $_GET['division']; } else { $division = ''; }
        if(isset($_GET['creation'])){ $creation = (string)  $_GET['creation']; } else { $creation = ''; }
        if(isset($_GET['logo'])){ $logo = (string) $_GET['logo']; } else { $logo = ''; }

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':localisations', $localisations, PDO::PARAM_STR);
        $stmt->bindParam(':division', $division, PDO::PARAM_STR);
        $stmt->bindParam(':creation', $creation, PDO::PARAM_STR);
        $stmt->bindParam(':logo', $logo, PDO::PARAM_STR);

        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Equipe modifie avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        
    }

    function SuppEquipe($id){
        global $conn;
        $stmt = $conn->prepare("DELETE FROM equipes WHERE id = :id;");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Equipe supprime avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }
