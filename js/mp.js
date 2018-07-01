
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
  var bn = {};
  for(var i=0; i < obj.data.length; i++){
    bn.push(res.data[i].download_url);
  }
};

window.onload = function(){
	run();
};

function run(){
  //var qs = decodeURIComponent(window.location.search);
  //var link = qs.slice(7, qs.length - 1);
  $.ajax({
      crossOrigin: true,
      url: "https://api.github.com/repos/jtblog/jtblog.github.io/contents/images/slides",
      dataType : "jsonp",
      success: function(res) {
        for(var i=0; i < res.data.length; i++){
          //alert(JSON.stringify(res.data[i].path));
          getimages(res.data[i].path);
        }
      }
    });
};

function getimages(path){
  var content_url = "https://api.github.com/repos/jtblog/jtblog.github.io/contents/";
  
  $.ajax({
      crossOrigin: true,
      url: content_url + path,
      dataType : "jsonp",
      success: function(res) {
        loadimages(res);
      }
    });
};