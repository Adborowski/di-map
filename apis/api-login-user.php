<?php

require_once "../db.php";

$submittedUsername = $_POST['submittedUsername'];
$submittedPassword = $_POST['submittedPassword'];

try{

    $sQuery = $db->prepare('SELECT * FROM users WHERE username = :submittedUsername AND password = :submittedPassword');
    $sQuery->bindValue(':submittedUsername', $submittedUsername);
    $sQuery->bindValue(':submittedPassword', $submittedPassword);
    $sQuery->execute();
    $aResults = $sQuery->fetchAll();

    if (count($aResults) > 0){
        // echo '{"status":1, "message": "[API-LOGIN-USER] Logged In", "userId": "'.$aResults[0]["id"].'"}';
        echo JSON_encode($aResults[0]);
        // var_dump($aResults);
    } else {
        echo '{"status":0, "message": "[API-LOGIN-USER] Failed to Log In"}';
    }

}catch(PDOException $ex){

    echo '{"status":0, "message": '.$ex.'}';

}