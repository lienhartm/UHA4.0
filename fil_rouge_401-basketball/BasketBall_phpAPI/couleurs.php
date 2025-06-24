<?php

    include('dao.php');

    header('Content-Type: application/json');

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method){
        case 'POST':
            AddCouleur();
            break;
        case 'GET':
            if(!empty($_GET['id'])){
                $id = intval($_GET['id']);
                GetCouleur($id);
            } else {
                GetCouleurs();
            }
            break;
        case 'UPDATE':
            $id = $_GET['id'];
            UppCouleur($id);
            break;
        case 'DELETE':
            SuppCouleur();
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;

    }

    function AddCouleur(){
        global $conn;
        $stmt = $conn->prepare("INSERT INTO couleurs(nom) VALUES (:nom);");
        if(isset($_POST['nom'])){ $nom = (string) $_POST['nom']; } else { $nom = ''; }
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
        $stmt->execute();
        $stmt = $conn->prepare("INSERT INTO couleurs (id_couleur, id_couleur) VALUES (:id_couleur, :id_equipe);");
        if(isset($_POST['id_couleur'])){ $id_couleur = (int) $_POST['id_couleur']; } else { $id_couleur = ''; }
        if(isset($_POST['id_equipe'])){ $id_equipe = (int) $_POST['id_equipe']; } else { $id_equipe = ''; }
        $stmt->bindParam(':id_couleur', $id_couleur, PDO::PARAM_INT);
        $stmt->bindParam(':id_equipe', $id_equipe, PDO::PARAM_INT);
        if($stmt->execute()){
            $response=array(
                'status'=> 1,
                'status_message' => 'Couleur ajoute avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }

    function GetCouleurs(){
        global $conn;
        $stmt = $conn->prepare("SELECT couleurs_equipes.id_equipe, couleurs.nom FROM couleurs_equipes JOIN couleurs ON couleurs_equipes.id_couleur = couleurs.id ORDER BY couleurs_equipes.id_equipe;");
        $stmt->execute();
        $response = array();
        $result_couleurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $equipe = 0;
        $response['couleurs'] = array();
        foreach($result_couleurs as $couleurs){
                $equipe = $couleurs['id_equipe'];
                $response['couleurs'][$equipe][] = $couleurs['nom'];
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function GetCouleur($id = 0){
        global $conn;
        $id = $_GET['id'];
        if($id != 0){
            $stmt = $conn->prepare("SELECT couleurs_equipes.id_equipe, couleurs.nom FROM couleurs_equipes JOIN couleurs ON couleurs_equipes.id_couleur = couleurs.id WHERE couleurs_equipes.id_equipe = :id;");
            if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $response = array();
            $response = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare("SELECT couleurs_equipes.id_equipe, couleurs.nom FROM couleurs_equipes JOIN couleurs ON couleurs_equipes.id_couleur = couleurs.id ORDER BY couleurs_equipes.id_equipe;");
            $stmt->execute();
            $response = array();
            $result_couleurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $equipe = 0;
            $response['couleurs'] = [];
            foreach($result_couleurs as $couleurs){
                foreach($couleurs as $key => $value){
                    if($key == 'id_equipe'){
                        if($value > $equipe){
                            $equipe = $value;
                        }
                    }
                    if($key == 'nom'){
                        $response['couleurs'][$equipe][] .= $value;
                    }
                }
            }
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    }

    function UppCouleur($id){
        global $conn;
		//$_PUT = array();
		//parse_str(file_get_contents('php://input'), $_PUT);
        file_get_contents('php://input');

        $stmt = $conn->prepare("UPDATE couleurs SET nom = :nom WHERE id = :id;");

        if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }
        if(isset($_GET['nom'])){ $nom = (string) $_GET['nom']; } else { $nom = ''; }
        
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);

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

    function SuppCouleur(){
        global $conn;
        if(isset($_GET['id'])){ $id = (int) $_GET['id']; } else { $id = ''; }
        $sql = "DELETE FROM couleurs WHERE id = $id;";
        if($conn->exec($sql)){
            $response=array(
                'status'=> 1,
                'status_message' => 'Couleur supprime avec succes'
            );
        } else {
            $response=array(
                'status' => 0,
                'status_message' => 'ERREUR!'
            );
        }
        echo json_encode($response);
    }