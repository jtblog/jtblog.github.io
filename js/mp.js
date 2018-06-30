
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
var jsn = null;

function loadslides(obj){
  jsn = obj;
};

window.onload = function(){
	run();
};

function run(){
  //var qs = decodeURIComponent(window.location.search);
  //var link = qs.slice(7, qs.length - 1);
  var content_url = "https://api.github.com/repos/jtblog/jtblog.github.io/contents";
  var loc = "/images/slides";

  $.ajax({
      crossOrigin: true,
      url: content_url + loc,
      dataType : "jsonp",
      success: function(res) {
        loadslides(res);
      }
    });
};