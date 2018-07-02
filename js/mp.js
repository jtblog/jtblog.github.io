
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
var idys = [];
var cons = [];
var animate;
var nflds;

function loadimages(obj, nme){
  var con = '<tr id="' + nme + '"><td><div style="position: absolute; top:' + (bnme.length * 250) + 'px;">';
  bnme.push(nme);

  var id0 = [];
  if(obj.data.length <= 4){
    for(var i=0; i < obj.data.length; i++){
      con = con + '<img id = "' + obj.data[i].sha + bnme.length + '' + '" src="' + obj.data[i].download_url + '" alt="" title="" style="position: absolute;  left: ' + (i*300) + 'px; "/>';
      id0.push(obj.data[i].sha + bnme.length + '');
    }
  }
  con = con + '</div></td></tr><br>';
  idys.push(id0);
  cons.push(con);

  var lcnt = '';
  for(var j=0; j < cons.length; j++){
    lcnt = lcnt + cons[j];
  }

  document.getElementById('adimg').innerHTML = "";
  document.getElementById('adimg').innerHTML = lcnt;
  if(idys.length == nflds){
    animate = setTimeout(move, 5000);
  }
};

function move(){
  for(var i = 0; i < idys.length; i++){
    var frst = document.getElementById('' + idys[i][0] + '');
     var secnd = document.getElementById('' + idys[i][1] + '');
      var thrd = document.getElementById('' + idys[i][2] + '');
       var foth = document.getElementById('' + idys[i][3] + '');

       if( (parseInt(frst.style.left) - 300) < 0){
          frst.style.left = '900px';
       }else{
          frst.style.left = parseInt(frst.style.left) - 300 + 'px';
       }

       if( (parseInt(secnd.style.left) - 300) < 0){
          secnd.style.left = '900px';
       }else{
          secnd.style.left = parseInt(secnd.style.left) - 300 + 'px';
       }

       if( (parseInt(thrd.style.left) - 300) < 0){
          thrd.style.left = '900px';
       }else{
          thrd.style.left = parseInt(thrd.style.left) - 300 + 'px';
       }

       if( (parseInt(foth.style.left) - 300) < 0){
          foth.style.left = '900px';
       }else{
          foth.style.left = parseInt(foth.style.left) - 300 + 'px';
       }

       animate = setTimeout(move, 5000);
  }
}

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
        nflds = res.data.length;
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