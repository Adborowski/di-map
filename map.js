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
    "imgUrl": "1.jpg",
    "title": "Trash pickup around the lakes",
    "note": "Ensure your system meets each of the following prerequisites. You only need to perform each prerequisite step once on your system.",
    "reward": 150
}

var oTestMarker2 = {
    "id": 2,
    "latlng": {"lat": 55.68342592492469, "lng": 12.5701},
    "imgUrl": "2.jpg",
    "title": "Messy garbage bin in City Center",
    "note": "Once you have installed the MongoDB Server in the steps above, the Database Tools are available directly from the command line in your macOS Terminal application.",
    "reward": 200
}

var oTestMarker3 = {
    "id": 3,
    "latlng": {"lat": 55.68110881940737, "lng": 12.566422087656976},
    "imgUrl": "3.jpg",
    "title": "Get my frisbee out of the tree",
    "note": "My beloved frisbee is stuck in the tree. Get it out and put it on the ground. I'll pick it up.",
    "reward": 80
}

var oTestMarker4 = {
    "id": 4,
    "latlng": {"lat": 55.68455848771191, "lng": 12.565476879753989},
    "imgUrl": "4.jpg",
    "title": "Clean the stairs",
    "note": "These stairs need to be refreshed after winter.",
    "reward": 130
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
markersArray.push(oTestMarker3);
markersArray.push(oTestMarker4);

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

    <div class="popup">

        <div class="popup-image">
            <img src="images/${pinObject.imgUrl}">
        </div>

        <div class="popup-content" data-pin-id=${pinObject.id}>
            
            <div class="title" type="text">${pinObject.title}</div>
            <div class="note" type="text">${pinObject.note}</div>
            <div class="reward">Bounty: ${pinObject.reward} kr</div>
            <div class="popup controls">

                <div class="btn"><div class="label">Add Bounty</div></div>
                <div class="btn"><div class="label">Fix</div></div>

            </div>
        
        </div>

    </div>
    `
    return popupContentString;
}

map.addEventListener("click", function(mapClick){
    console.log(mapClick.latlng);
        // activePin = createPin([mapClick.latlng.lat, mapClick.latlng.lng]); // create a pin

});

function getMarkerObjectsFromBackend(){

    $.ajax({
      url: "apis/api-get-markers.php",
      method: "post",
      data: "",
      dataType: "json"
    }).always(function(jData){
      console.log("Data Retrieved:", jData); 
    //   console.log(JSON.parse(jData.responseText)); 
    });

}

getMarkerObjectsFromBackend();

    


