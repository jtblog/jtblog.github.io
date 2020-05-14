const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var lat = 51.505;
var long = -0.09;
var mymap;

document.addEventListener('DOMContentLoaded', function() {
    getLocation();
});

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
}