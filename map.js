console.log("[MAP.JS]");

var copenhagenLocation = [55.685, 12.57];
var copenhagenLocation2 = [55.6854, 12.5702];
var zoomLevel = 16; // higher number - sat closer to ground; default 13

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
    popupAnchor: [0, -10],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var oTestMarker = {
    "id": 1,
    "latlng": {"lat": 55.6852, "lng": 12.5703},
    "title": "dummy title",
    "note": "dummy note note note note note note note note note note note note note note note",
    "reward": 150
}

var oTestMarker2 = {
    "id": 2,
    "latlng": {"lat": 55.6851, "lng": 12.5701},
    "title": "dummy title 2",
    "note": "dummy note note note note note note note note note note note note note note note",
    "reward": 200
}

function markerClicked(marker){
    console.log("Marker clicked:", marker.target);
}

function createPin(latLong){ // new empty pins

    var newPin = L.marker(latLong, {icon: pinIcon}).addTo(map);

    newPin.addEventListener("click", markerClicked);
        
    newPin.id = 1;
    console.log("Creating new Pin:", newPin)
    var newPopup = createPopup(latLong);
    newPin.bindPopup(newPopup);
}

function displayMarker(markerObject){ // existing pins, with content


}

var markersArray = [];

markersArray.push(oTestMarker);
markersArray.push(oTestMarker2);

function renderMarkers(markersArray){

    markersArray.forEach((markerObject)=>{
        console.log("Processing single pin:", markerObject);

        var newMarker = L.marker(markerObject.latlng, {icon: pinIcon})

        newMarker.id = markerObject.id;
        newMarker.latlng = markerObject.latlng;
        newMarker.title = markerObject.title;

        newMarker.addEventListener("click", function(e){
            console.log(newMarker);
        });

        var newPopup = L.popup({offset: [0,-30]})
        .setLatLng(markerObject.latlng)
        .setContent(createPopupContent(markerObject))
        newPopup.addEventListener("click", function(newPopup){
            console.log(newPopup)
        })

        newMarker.bindPopup(newPopup);
        
        newMarker.addTo(map);
    })
}

renderMarkers(markersArray);

function createPopupContent(pinObject){

    var popupContentString = `
    <div class="popup-content" data-pin-id=${pinObject.id}>

        <div class="title" type="text">${pinObject.title}</div>
        <div class="note" type="text">${pinObject.note}</div>

        <div class="reward controls">
            <div class="reward">${pinObject.reward}</div>
        </div>

        <div class="popup controls">
            <div class="btn btn-a"><div class="label">Accept</div></div>
            <div class="btn btn-b"><div class="label">Close</div></div>
        </div>
    
    </div>
    `
    return popupContentString;
}

map.addEventListener("click", function(mapClick){

        // activePin = createPin([mapClick.latlng.lat, mapClick.latlng.lng]); // create a pin

});




