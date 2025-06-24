<?php

    include('dao.php');

    header('Content-Type: application/json');

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method){

        case 'POST':
            AddJoueur();
            break;
        case 'GET':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                GetJoueur($id);
            } else {
                GetJoueurs();
            }
            break;
        case 'PUT':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                UppJoueur($id);
            }
            break;
        case 'DELETE':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                SuppJoueur($id);
            }
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }

    function AddJoueur(){
        global $conn;

        if(isset($_GET['nom'])){$nom = (string) $_GET['nom'];} else {$nom = '';}
        if(isset($_GET['position'])){$position = (string) $_GET['position'];} else {$position = '';}
        if(isset($_GET['No'])){$No = (int)  $_GET['No'];} else {$No = '';}
        if(isset($_GET['equipe'])){$equipe = (int) $_GET['equipe'];} else {$equipe = '';}
        if(isset($_GET['taille'])){$taille = (float) $_GET['taille'];} else {$taille = '';}
        if(isset($_GET['poid'])){$poid = (int) $_GET['poid'];} else {$poid = '';}

        $stmt = $conn->prepare("INSERT INTO joueurs(nom, position, No, equipe, taille, poid) VALUES (:nom, :position, :No, :equipe, :taille, :poid);");

        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':position', $position, PDO::PARAM_STR);
        $stmt->bindParam(':No', $No, PDO::PARAM_INT);
        $stmt->bindParam(':equipe', $equipe, PDO::PARAM_INT);
        $stmt->bindParam(':taille', $taille, PDO::PARAM_STR);
        $stmt->bindParam(':poid', $poid, PDO::PARAM_INT);

        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Joueur ajoute avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }

    function GetJoueurs(){
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM joueurs ORDER BY joueurs.nom;");
        $stmt->execute();
        $response = array();
        $response['joueurs'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function GetJoueur($id = 0){
        global $conn;
        if(isset($_GET['id'])){$id = (int) $_GET['id'];} else {$id = '';}
        if($id != 0){
            $stmt = $conn->prepare("SELECT * FROM joueurs WHERE id = :id;");
            if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare("SELECT * FROM joueurs;");
        }
        $stmt->execute();
        $response = array();
        $response = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function UppJoueur($id){
        global $conn;
        $stmt = $conn->prepare("UPDATE joueurs SET nom = :nom, position = :position, No = :No, equipe = :equipe, taille = :taille, poid = :poid WHERE id = :id;");

        if(isset($_GET['nom'])){ $nom = (string) $_GET['nom']; } else { $nom = ''; }
        if(isset($_GET['position'])){ $position = (string) $_GET['position']; } else { $position = ''; }
        if(isset($_GET['No'])){ $No = (int) $_GET['No']; } else { $No = ''; }
        if(isset($_GET['equipe'])){ $equipe = (int) $_GET['equipe']; } else { $equipe = ''; }
        if(isset($_GET['taille'])){ $taille = (float) $_GET['taille']; } else { $taille = ''; }
        if(isset($_GET['poid'])){ $poid = (int) $_GET['poid']; } else { $poid = ''; }

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->bindParam(':position', $position, PDO::PARAM_STR);
        $stmt->bindParam(':No', $No, PDO::PARAM_INT);
        $stmt->bindParam(':equipe', $equipe, PDO::PARAM_INT);
        $stmt->bindParam(':taille', $taille, PDO::PARAM_STR);
        $stmt->bindParam(':poid', $poid, PDO::PARAM_INT);

        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Couleur modifie avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }

    }

    function SuppJoueur($id){
        global $conn;
        $stmt = $conn->prepare("DELETE FROM joueurs WHERE id = :id;");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Joueur supprime avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }
