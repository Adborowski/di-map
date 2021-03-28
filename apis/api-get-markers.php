<?php

require_once "../db.php";

// var_dump ($_POST["iTargetUserId"]);

$sQuery = $db->prepare( "SELECT * FROM markers");

$sQuery -> execute();

$sResults = $sQuery->fetchAll();
// var_dump($aResults);

$aResults = array();

foreach ($sResults as $sResult){
    array_push($aResults, $sResult);
}

$sResults = json_encode($aResults);
echo $sResults;


// SELECT ProductID, Name, ListPrice, ListPrice * 1.15 AS NewPrice  
// FROM Production.Product  
// WHERE Name LIKE 'Mountain-%'  
// ORDER BY ProductID ASC;  
// GO  