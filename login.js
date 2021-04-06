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

        if (userObject.id>0){ // API returns a user object with non-zero id
            userObject.id = parseInt(userObject.id);
            console.log(userObject);
            $("#user-marker").text(userObject.id);
            fadeOutLoginScreen();

        // populate the menu panel with the user's name and their ID for db queries (hack)
            document.querySelector("#user-marker").innerHTML = userObject.id;
            document.querySelector("#active-username").innerHTML = userObject.username;

        } else { // if failed to sign in
            alert ("Failed to sign in. Please try again.");
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