<?php

if(isset($_FILES['file']['name'])){

   /* Getting file name */
   // $_FILES['file']['name'] = "SUKO.jpg";
   $filename = $_FILES['file']['name'];
   /* Location */
   $location = '../images/'.$filename; // change this to 'images'
   $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
   $imageFileType = strtolower($imageFileType);

   /* Valid extensions */
   $valid_extensions = array("jpg","jpeg","png");

   $response = 0;
   /* Check file extension */
   if(in_array(strtolower($imageFileType), $valid_extensions)) {

      $temp = explode(".", $_FILES["file"]["name"]);
      $newfilename = round(microtime(true)) . '.' . end($temp);
      $uploadSuccess = move_uploaded_file($_FILES["file"]["tmp_name"], "../images/" . $newfilename);
      // $uploadSuccess = move_uploaded_file($_FILES['file']['tmp_name'],$location);
      /* Upload file */
      if($uploadSuccess){
         $response = $newfilename;
      } else {
         $response = "[API-UPLOAD-IMAGE] Upload failed.";
      }
   }

   echo $response;
   exit;
}

echo 0;