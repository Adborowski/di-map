<?php

require_once "../db.php";

$newMarkerLatlng = $_POST['newMarkerLatlng'];
$newMarkerImgurl = $_POST['newMarkerImgurl'];
$newMarkerTitle = $_POST['newMarkerTitle'];
$newMarkerNote = $_POST['newMarkerNote'];
$newMarkerReward = $_POST['newMarkerReward'];
$newMarkerOwnerId = $_POST['newMarkerOwnerId'];

// $db->beginTransaction();

try{

$sQuery = $db->prepare('INSERT INTO markers VALUES (NULL, :newMarkerLatlng, :newMarkerImgurl, :newMarkerTitle, :newMarkerNote, :newMarkerReward, :newMarkerOwnerId)');
$sQuery->bindValue("newMarkerLatlng", $newMarkerLatlng);
$sQuery->bindValue(":newMarkerImgurl", $newMarkerImgurl);
$sQuery->bindValue(":newMarkerTitle", $newMarkerTitle);
$sQuery->bindValue(":newMarkerNote", $newMarkerNote);
$sQuery->bindValue(":newMarkerReward", $newMarkerReward);
$sQuery->bindValue(":newMarkerOwnerId", $newMarkerOwnerId);

$sQuery->execute();

echo '{"status" : "1", "message" : "Marker added successfully"}';

}catch(PDOException $ex){

    echo $ex;

}