<?php
require_once "../db.php";

$sQuery = $db->prepare('SELECT * FROM markers');
$sQuery -> execute();
$aResults = $sQuery->fetchAll();
// $sResults = JSON_encode($aResults);

$sResults = json_encode($aResults);
echo $sResults;
?>
