function setTemporaryImageName(ajaxInput){
   $("#temporary-img-id").text(ajaxInput);
   return ajaxInput;
}

function uploadImage(){

   var fd = new FormData();
   var files = $('#file')[0].files;
   
   if(files.length > 0 ){
      fd.append('file',files[0]);

      $.ajax({
         url: 'apis/api-upload-image.php', // the api
         type: 'post',
         data: fd, // empty formdata
         contentType: false,
         processData: false,
         success: function(response){

            if(response != 0){ // success
               $("#upload-preview").attr("src", "images/"+response); // a bit of a hack - 'response' is just the file name
               $("#upload-preview").show(); // Display image element
               $("#image-upload-overlay").css({opacity: 0})
               setTemporaryImageName(response); // for database purposes I need the file name out of ajax, also a hack
               console.log(response);
            } else {
               alert('file not uploaded');

            } // end of else

         }, // end of success

      }); // end of ajax  

   }else{
      console.log("please select a file")
   }

}

function powerImageUploadButton(){
   $("#but_upload").click(function(){
         uploadImage();
   });
}