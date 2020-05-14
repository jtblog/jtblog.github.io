const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var lat = 6.4474;
var long = 3.3903;
var mymap;

document.addEventListener('DOMContentLoaded', function() {
    var site = window.location.href + "";
    if(isAvailable("mapid")){
        getLocation();
    }
});

function isAvailable(_id){
    try{
        if(document.getElementById("mapid") == null || document.getElementById("mapid") == undefined){
            return false
        }else{
            return true
        }
    }catch(e){
        return false
    }
}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
        mymap = L.map('mapid').setView([lat, long], 13);
        const tiles = L.tileLayer(tileUrl, { attribution })
        tiles.addTo(mymap);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    mymap = L.map('mapid').setView([lat, long], 13);
    const tiles = L.tileLayer(tileUrl, { attribution })
    tiles.addTo(mymap);
    var marker = L.marker([lat, long]).addTo(mymap);
    
    var circle = L.circle([lat-0.100, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(mymap);
}