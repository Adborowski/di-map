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

    $.ajax({

        url: "apis/api-login-user.php",
        data: {
            "submittedUsername": submittedUsername,
            "submittedPassword": submittedPassword,
        },
        method: "post",

    }).done(function(sData){

        var userObject = JSON.parse(sData);

        if (userObject){
            console.log(userObject);
            userObject.userId = parseInt(userObject.userId);
            $("#user-marker").text(userObject.userId);
        // move login screen out of the way; move in the map

            fadeOutLoginScreen();
        // populate the menu panel with the user's name and their ID for db queries
            document.querySelector("#user-marker").innerHTML = userObject.id;
            document.querySelector("#active-username").innerHTML = userObject.username;
        }


        getMarkerObjectsFromBackend(); // redraw so ownership would update
    });

}

function fadeOutLoginScreen(){

    document.querySelector(".background-login").style.transition = "0.3s all";
    document.querySelector(".background-login").style.opacity = "0";
    window.setTimeout(() => {
        document.querySelector(".background-login").style.display = "none";
    }, 300);


}

function verifyAuthentication(){

    if (userMarker > 0){
        console.log("OK");



    }

}