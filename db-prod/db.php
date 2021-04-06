<?php

try{

  $sUserName = 'adamboro_dimap';
  $sPassword = 'dimap';
  $sConnection = "mysql:host=localhost; dbname=adamboro_dimap; charset=utf8mb4";

  $aOptions = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );

  $db = new PDO( $sConnection, $sUserName, $sPassword, $aOptions );
  echo '';

}catch( PDOException $e){
  echo $e->getMessage(); 
  exit();
}


