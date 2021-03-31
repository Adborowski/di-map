$("#wrapper-login").on("keypress", function(e){
    if(e.which === 13) {
        loginUser();
      }
})

$(".input").on("keypress", function(e){
    if(e.which === 13) {
        e.preventDefault();
    }
})

$("#btn-login-submit").on("click", function(e){
    loginUser();
})

function loginUser(){

    var submittedUsername = $("#login-username").text();
    var submittedPassword = $("#login-password").text();
    console.log("submitting login: ", submittedUsername, submittedPassword);

    $.ajax({ // marker gets saved in the backend first

        url: "apis/api-login-user.php",
        data: {
            "submittedUsername": submittedUsername,
            "submittedPassword": submittedPassword,
        },
        method: "post",

    }).done(function(sData){

        var processedData = JSON.parse(sData);

        if(processedData.status == 1){
            processedData.userId = parseInt(processedData.userId);
            $("#user-marker").text(processedData.userId);
            verifyAuthentication();
        }

        console.log(processedData);
    });

}

function verifyAuthentication(){
    console.log("Verifying authentication...");
    var userMarker = document.getElementById("user-marker").innerHTML;
    if (userMarker > 0){
        console.log("OK");
        document.querySelector(".background-login").style.top = "-2000px";
        document.querySelector("#mapid").style.top = "0";
    }

}