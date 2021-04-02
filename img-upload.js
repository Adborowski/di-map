function powerImageUploadButton(){

    $("#but_upload").click(function(){

        var fd = new FormData();
        var files = $('#file')[0].files;
        
        // Check file selected or not
        if(files.length > 0 ){
           fd.append('file',files[0]);

           $.ajax({
              url: 'apis/api-upload-image.php', // the api
              type: 'post',
              data: fd, // empty formdata
              contentType: false,
              processData: false,
              success: function(response){
                  console.log("Done with AJAX for img up", response)
                 if(response != 0){
                    $("#img").attr("src",response); 
                    $(".preview img").show(); // Display image element
                 }else{
                    alert('file not uploaded');
                 }
              },
           });
        }else{
           console.log("please select a file")
        }
    });
}