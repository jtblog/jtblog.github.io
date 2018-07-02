
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
var bnme = [];
var cons = [];

function loadimages(obj, nme){
  var con = "";
  bnme.push(nme);

  var bg = '<tr id="' + nme + '">';
  if(obj.data.length <= 4){
    for(var i=0; i < obj.data.length; i++){
      con = con + '<img id = "' + obj.data[i].sha + '" src="' + obj.data[i].download_url + '" alt="" title="" style="position: absolute;  left: ' + (i*300) + 'px; "/>';
    }
  }
  var en = '</tr>';
  var insde = bg + con + en;
  cons.push(insde);

  var lcnt = '';
  for(var j=0; j < cons.length; j++){
    lcnt = lcnt + cons[j];
  }

  document.getElementById('adimg').innerHTML = lcnt;
  //document.getElementById("myDiv").children;
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
          if(res.data[i].type == 'dir'){
            getimages(res.data[i].path, res.data[i].name);
          }
        }
      }
    });

};

function getimages(path, nme){
  var content_url = "https://api.github.com/repos/jtblog/jtblog.github.io/contents/";

  $.ajax({
      crossOrigin: true,
      url: content_url + path,
      dataType : "jsonp",
      success: function(res) {
        loadimages(res, nme);
      }
    });
};