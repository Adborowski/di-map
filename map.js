// TODO
// - Save content of unfinished markers and paste it in when reopened
// - Not Empty validation on marker editor
// - Marker Editor or Editor Marker?

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

var pinIconEditMode = L.icon({
    iconUrl: 'pin-4.svg',
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

var markersLayerGroup = L.layerGroup();
var openMarker = false;

function renderMarker(markerObject){

    // console.log("Rendering marker: ", markerObject);

        var newMarker = L.marker(markerObject.latlng, {icon: pinIcon})

        newMarker.id = markerObject.id;
        newMarker.latlng = markerObject.latlng;
        newMarker.title = markerObject.title;
        newMarker.type = "marker";

        newMarker.addEventListener("click", function(e){
            openMarker = newMarker;
        });

        var newPopup = L.popup({offset: [0,-30]})
        .setLatLng(markerObject.latlng)
        .setContent(createPopupContent(markerObject))
        
        newPopup.addEventListener("click", function(newPopup){
            console.log(newPopup)
        })

        newPopup.type = "marker";
        newPopup.popupId = parseInt(markerObject.id);
        

        newMarker.bindPopup(newPopup);
        markersLayerGroup.addLayer(newMarker);
        markersLayerGroup.addTo(map);

};

function renderMarkers(markersArray){
    markersArray.forEach((markerObject)=>{
        renderMarker(markerObject);
    })
}

var openEditorMarker = false; // a bool, which later turns into a marker object
function renderMarkerEditor(latlng){

    console.log("Rendering marker editor.");

        if (openEditorMarker != false){ 
            openEditorMarker.remove(); // remove abandoned editor pins
        }

        var newMarker = L.marker(latlng, {draggable: false, icon: pinIconEditMode})
                         .on('click', ()=>{openMarker = false}); // hotfix - the openMarker flag system needs a rework
        newMarker.type = "markerEditor";

        var newPopup = L.popup({offset: [0,-30]})
        .setLatLng(latlng)
        .setContent(createPopupEditorContent());

        newPopup.type = "markerEditor";
        
        newMarker.bindPopup(newPopup);
        newMarker.addTo(map);
        newMarker.openPopup();

        newPopup.addEventListener("click", function(newPopup){
            console.log(newPopup);
        })

        // newMarker.on('dragend', function(e) { // this is cool ux but dragging is disabled for now
        //     newMarker.openPopup();
        //     });

        openEditorMarker = newMarker;
        openMarker = newMarker;

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
            newMarkerObject.latlng = latlng;
            newMarkerObject.imgurl = "1.jpg"; // dummy for now, will get back to img upload
            newMarkerObject.title = document.querySelector("div.title").innerHTML;
            newMarkerObject.note = document.querySelector("div.note").innerHTML;
            newMarkerObject.reward = document.querySelector("input.reward").value;

            postMarker(newMarkerObject);

        });


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
                <div class="btn btn-delete-marker"><div class="label">Delete Marker</div>
            </div>

        </div>

    </div>
    `
    return popupContentString;
}

function postMarker(newMarkerObject){

    $.ajax({ // marker gets saved in the backend first

        url: "apis/api-post-new-marker.php",
        data: {
            "newMarkerLatlng": JSON.stringify(newMarkerObject.latlng),
            "newMarkerImgurl": newMarkerObject.imgurl,
            "newMarkerTitle": newMarkerObject.title,
            "newMarkerNote": newMarkerObject.note,
            "newMarkerReward": newMarkerObject.reward,
        },
        method: "post",

    }).done(function(sData){

        // substring(1) is once again a hack - for some reason the json-string gets prepended with a space in the API. Will cause problems later.
        console.log("Posting marker...", JSON.parse(sData.substring(1)));
        getMarkerObjectsFromBackend(); // the map gets updated
        map.closePopup(); // close after posting
        openMarker = false; // marker is closed now

    });

}

function createPopupEditorContent(){

    var popupEditorContentString = `

    <div class="popup">

        <div class="popup-image btn-add-image">
            <img src="images/editor-e.jpg">
        </div>

        <div class="popup-content editor">
            
            <div contenteditable="true" class="editable title" type="text" data-placeholder="Add a title"></div>
            <div contenteditable="true" class="editable note" type="text" data-placeholder="Add a note"></div>
            <input type="number" class="editable reward" placeholder="Set a reward"></input>
            <div class="popup controls">

                <div class="btn btn-post-marker"><div class="label">Post</div></div>
                <div class="btn btn-cancel-marker"><div class="label">Cancel</div></div>

            </div>
        
        </div>

    </div>
    `
    return popupEditorContentString;
}

// map click handling
map.addEventListener("click", function(mapClick){

    console.log("Map clicked at latlng", mapClick.latlng);

    if (openMarker != false){ // control what happens when you click away while there is an open popup on the map
        openMarker.closePopup();
        openMarker = false;
    } else {
        renderMarkerEditor(mapClick.latlng);
    }

});

map.addEventListener("popupopen", (popupEvent)=>{ // power the Cancel button on every opening of a popup - also when created, closed, then reopened

    var markerId = popupEvent.popup.popupId;

    $(".btn-delete-marker").on("click", ()=>{
        deleteMarker(markerId);
    })

})

map.addEventListener("popupclose", (popup)=>{
    openEditorMarker ? openEditorMarker.remove() : console.log();
    openEditorMarker = false;
});

function deleteMarker(markerId){
    console.log("Deleting marker with id", markerId);
}

// rendering function is called inside this
function getMarkerObjectsFromBackend(){

    var backendMarkersArray = [];

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
        console.log("GROUP:", markersLayerGroup);
    
    }).fail(function(){
        console.log("Failed to get markers from backend.")
    });
}

getMarkerObjectsFromBackend();



