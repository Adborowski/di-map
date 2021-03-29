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

function renderMarker(markerObject){

    console.log("Rendering marker: ", markerObject);

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

};

var openEditorMarker = false;

function renderMarkerEditor(latlng){

    console.log("Rendering marker editor.");

        if (openEditorMarker != false){ 
            openEditorMarker.remove(); // remove abandoned editor pins
        }

        var newMarker = L.marker(latlng, {icon: pinIcon});
        var newPopup = L.popup({offset: [0,-30]})
        .setLatLng(latlng)
        .setContent(createPopupEditorContent());

        newPopup.addEventListener("click", function(newPopup){
            console.log(newPopup)
        })

        newMarker.bindPopup(newPopup);
        newMarker.addTo(map);
        newMarker.openPopup();

        openEditorMarker = newMarker;

        $(".btn-cancel-marker").on("click", ()=>{
            newMarker.closePopup();
            newMarker.remove();
        })

        $(".btn-add-image").on("click", ()=>{
            console.log("Adding image... (coming soon)");
        })

        $(".btn-post-marker").on("click", ()=>{
            console.log("Posting marker...");
            var newMarkerObject = {};
            newMarkerObject.title = document.querySelector("textarea.title").value;
            newMarkerObject.note = document.querySelector("textarea.note").value;
            newMarkerObject.reward = document.querySelector("input.reward").value;
            console.log(newMarkerObject);
            postMarker();
        })
}



function renderMarkers(markersArray){
    markersArray.forEach((markerObject)=>{
        renderMarker(markerObject);
    })
}

function createPopupContent(markerObject){
    // common popup with marker data from db
    var popupContentString = `

    <div class="popup">

        <div class="popup-image">
            <img src="images/${markerObject.imgurl}">
        </div>

        <div class="popup-content" data-pin-id=${markerObject.id}>
            
            <div class="title" type="text">${markerObject.title}</div>
            <div class="note" type="text">${markerObject.note}</div>
            <div class="reward">Bounty: ${markerObject.reward} kr</div>
            <div class="popup controls">

                <div class="btn"><div class="label">Add Bounty</div></div>
                <div class="btn"><div class="label">Fix</div></div>

            </div>
        
        </div>

    </div>
    `
    return popupContentString;
}

function postMarker(){
    
}

function createPopupEditorContent(){

    var popupEditorContentString = `

    <div class="popup">

        <div class="popup-image btn-add-image">
            <img src="images/editor-e.jpg">
        </div>

        <div class="popup-content editor">
            
            <textarea class="title" type="text" placeholder="Add title"></textarea>
            <textarea class="note" type="text" placeholder="Add note"></textarea>
            <input type="number" class="reward" placeholder="Add bounty (kr)"></input>
            <div class="popup controls">

                <div class="btn btn-post-marker"><div class="label">Post</div></div>
                <div class="btn btn-cancel-marker"><div class="label">Cancel</div></div>

            </div>
        
        </div>

    </div>
    `
    return popupEditorContentString;
}

map.addEventListener("click", function(mapClick){
    console.log("Map clicked at latlng", mapClick.latlng);
    renderMarkerEditor(mapClick.latlng);
});

// rendering function is called inside this
function getMarkerObjectsFromBackend(){

    $.ajax({
      url: "apis/api-get-markers.php",
      type: "post",
      data: "",
    }).done(function(jData){
        jData = jData.substring(1);
        markersArray = JSON.parse(jData);

        // latlng is in the DB as a string, but Leaflet needs it as JSON
        markersArray.forEach((singleMarkerData) => {
            singleMarkerData.latlng = JSON.parse(singleMarkerData.latlng);
        })

        // the substring code is a hotfix - the data wouldn't parse because there was a space in front of it
        console.log("Fetched markers from database:", markersArray);
        renderMarkers(markersArray);
    
    }).fail(function(){
        console.log("Failed to get markers from backend.")
        
    });
}

getMarkerObjectsFromBackend();

    


