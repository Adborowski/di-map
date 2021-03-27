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

// note: buttons only exist in the DOM after their marker is clicked


// define pin icon
var pinIcon = L.icon({
    iconUrl: 'pin-2.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var oTestPin = {
    "latlng": [55.685, 12.57],
    "title": "dummy title",
    "note": "dummy note note note note note",
    "reward": 150
}

var pins = [];

pins.push(oTestPin);


var mapClickLocation;

var popupContentBase = getPopupContentString();

function createPin(latLong){

    var newPin = L.marker(latLong, {icon: pinIcon}).addTo(map);
    console.log("Creating new Pin:", newPin)
    var newPopup = createNewPopup(latLong);
    newPin.bindPopup(newPopup);
}

function createNewPopup(latLong){

    var newPopup = L.popup({offset: [0,-30]})
    .setLatLng(latLong)
    .setContent(popupContentBase)
    .openOn(map);

    var noteInput = document.getElementById("note-input");
    noteInput.addEventListener("keydown", function(event){
        console.log(noteInput.value);
    })

    return newPopup;

}

function getPopupContentString(){
    var popupContentBase = document.getElementById("popup-content");
    var popupContentBaseString = document.getElementById("popup-content").outerHTML;
    popupContentBase.parentNode.removeChild(popupContentBase);
    console.log("Getting popupContentBase:", popupContentBase);
    return popupContentBaseString;
}

map.addEventListener("click", function(mapClick){

        activePin = createPin([mapClick.latlng.lat, mapClick.latlng.lng]); // create a pin

});




