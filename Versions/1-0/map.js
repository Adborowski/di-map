console.log("[MAP.JS]");

var copenhagenLocation = [55.685, 12.57];
var copenhagenLocation2 = [55.6854, 12.5702];
var zoomLevel = 13; // higher number - sat closer to ground; default 13

var map = L.map('mapid').setView(copenhagenLocation, zoomLevel);
// first value of SetView goes up/down - higher number moves the satellite north
// second value goes left/right - higher number moves the satellite east


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', // satellite-v9 also available
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWRib3Jvd3NraSIsImEiOiJja21vcjJmYWgyN2RuMnBrNXdwaGQ5YXVyIn0.stnVilPeFh4jamL573O1Lw'
}).addTo(map);

var circle = L.circle(copenhagenLocation, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100
});


// circle.addTo(map);
// circle.bindPopup();


// buttons only exist in the DOM after their marker is clicked

circle.addEventListener("click", ()=>{

    var buttonA = document.getElementById("buttonA");
    buttonA.addEventListener("click", ()=>{alert("You have clicked button A")});

})

// var polygon = L.polygon([
//     copenhagenLocation,
//     [copenhagenLocation[0]+0.005, copenhagenLocation[1]+0.005],
//     [copenhagenLocation[0]+0.008, copenhagenLocation[1]-0.008]
// ]).addTo(map);

// var myIcon = L.divIcon({className: 'my-div-icon'});
// // you can set .my-div-icon styles in CSS
// L.marker(copenhagenLocation2, {icon: myIcon}).addTo(map);

var pinIcon = L.icon({
    iconUrl: 'pin-2.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var pins = [];
var mapClickLocation;

function createPin(latLong){

    var newPin = L.marker(latLong, {icon: pinIcon}).addTo(map);
    console.log("newPin:", newPin)
    console.log(newPin);
    pins.push(newPin);
    var newPopup = createNewPopup(latLong);
    newPin.bindPopup(newPopup);
}

function createNewPopup(latLong){

    var newPopup = L.popup({offset: [0,-30]})
    .setLatLng(latLong)
    .setContent('<p>Give your sign a topic</p>')
    .openOn(map);

    popupContent.innerHTML = `${newPopup.title}`;
    
    return newPopup;

}

createPin(copenhagenLocation);
createPin(copenhagenLocation2);

var canUserCreatePins = true;
var isPinOpen = false;
var activePin;
var mode = "create";

map.addEventListener("click", function(mapClick){

        activePin = createPin([mapClick.latlng.lat, mapClick.latlng.lng]); // create a pin

});




