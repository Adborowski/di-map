<?php

require_once "../db.php";

// var_dump($_POST);

$idToDelete = $_POST['markerId'];

try{

    $sQuery = $db->prepare('DELETE FROM markers WHERE id = :markerId');
    $sQuery->bindValue(':markerId', $idToDelete);
    $sQuery->execute();

    if (!$sQuery->rowCount()){
        echo '{"status":0, "message": "[API-DELETE] Error: Failed to Delete User"}';
    } else {
        echo '{"status":1, "message": "[API-DELETE] User Deleted Successfully"}';
    }

}catch(PDOException $ex){

    echo '{"status":0, "message": "[API-DELETE] Error: PDO Exception"}';

}