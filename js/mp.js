
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWBdM6ViEROH-wl9wARscI9Lmc-j15EZ4",
  authDomain: "jtblog-8b459.firebaseapp.com",
  databaseURL: "https://jtblog-8b459.firebaseio.com",
  projectId: "jtblog-8b459",
  storageBucket: "jtblog-8b459.appspot.com",
  messagingSenderId: "491611242309"
};
var app = firebase.initializeApp(config);
//var db = firebase.firestore(app);
//firebase.firestore().settings({ timestampsInSnapshots: true });

// Get a reference to the database service
var db = firebase.database();
var auth = firebase.auth();

function loadimages(obj){
  var el = '';
  if(obj.data.length <= 4){
    for(var i=0; i < obj.data.length; i++){
      el = el + '<img id = "' + obj.data[i].sha + '"src="' + obj.data[i].download_url + '" alt="" title="" style="position: relative; left: ' + (i*300) + 'px;"/>';
    }
  }
  return el;
};

window.onload = function(){
	run();
};

function run(){
  //var qs = decodeURIComponent(window.location.search);
  //var link = qs.slice(7, qs.length - 1);
  var im = '';

  $.ajax({
      crossOrigin: true,
      url: "https://api.github.com/repos/jtblog/jtblog.github.io/contents/images/slides",
      dataType : "jsonp",
      success: function(res) {
        for(var i=0; i < res.data.length; i++){
          if(res.data[i].type == 'dir'){
            im = im + '<tr>' + getimages(res.data[i].path) + '</tr>';
          }
        }
      }
    });

  document.getElementById('adimg').innerHTML = im;
};

function getimages(path){
  var content_url = "https://api.github.com/repos/jtblog/jtblog.github.io/contents/";
  var rr = "";

  $.ajax({
      crossOrigin: true,
      url: content_url + path,
      dataType : "jsonp",
      success: function(res) {
        rr = loadimages(res);
      }
    });
  return rr;
};