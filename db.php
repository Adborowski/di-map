<?php

try{

  $sUserName = 'root';
  $sPassword = 'root';
  $sConnection = "mysql:host=localhost; dbname=di-map; charset=utf8mb4";

  $aOptions = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );

  $db = new PDO( $sConnection, $sUserName, $sPassword, $aOptions );
  echo '';

}catch( PDOException $e){
  echo '{"status":"err","message":"cannot connect to database"}';
  print $e->getMessage(); 
  exit();
}


