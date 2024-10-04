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
    
    /*var circle = L.circle([lat+0.100, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(mymap);*/
}

function setPos(_lat, _long){
    mymap = L.map('mapid').setView([_lat, _long], 13);
    const tiles = L.tileLayer(tileUrl, { attribution })
    tiles.addTo(mymap);
    var marker = L.marker([lat, long]).addTo(mymap);
}






var url = 'https://jtblog.github.io/assets/pdf/oat_resume.pdf'; // Replace with the actual path to your PDF

var pdfDoc = null,
    pageNum = 1,
    canvasContainer = document.getElementById('pdfContainer');

  // Load the PDF
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    for (var i = 1; i <= pdfDoc.numPages; i++) {
      renderPage(i);  // Call renderPage for each page
    }
});

 function renderPage(num) {
    pdfDoc.getPage(num).then(function(page) {
      var scale = 1.5;
      var viewport = page.getViewport({scale: scale});

      // Create a canvas element for each page
      var canvas = document.createElement('canvas');
      canvas.style.display = 'block';  // Ensures that the canvas takes up a block
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Append the canvas to the container
      canvasContainer.appendChild(canvas);

      // Render the page
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
 }
