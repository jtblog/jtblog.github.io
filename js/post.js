$(document).ready(
    function(){
      $.ajax('showads.js').fail(function(d){if(d.status===0 || d.statusText == 'error'){$('html').addClass('ab');}}); 
    } 
);

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

window.onload = function(){
	run();
}  

function run(){
  var qs = decodeURIComponent(window.location.search);
  var link = qs.slice(7, qs.length - 1);
  $.ajax({
      crossOrigin: true,
      url: link,
      success: function(res) {
        var data0 = JSON.stringify(res);
        from_punch_post(data0)
      }
    });
}

function from_punch_post(data){

      data0 = data.replace(/\\n/g, "");
      data0 = data0.replace(/\\/g, "");
      data1 = data0;

      var i0 = data0.indexOf('entry-header');  
      var i1 = data0.indexOf('entry-footer'); 
      data0 = data0.slice(i0, i1);
  
      var sf0 = "title"
      var title = "";
      var slcleft0 = data0;
      while (title.includes(sf0) == false) {
          var i2 = slcleft0.indexOf('<h1');  
          var i3 = slcleft0.indexOf('/h1>') + 4;
          title = slcleft0.slice(i2, i3);
          slcleft0 = slcleft0.slice(i3, slcleft0.length)
          if(slcleft0.includes(sf0) == false){
            break;
          }
      }

      var mc = [];
      var slcleft1 = data0;
      while(slcleft1.includes('<p') == true || slcleft1.includes('/p>') == true){
        var i4 = slcleft1.indexOf('<p');
        var i5 = slcleft1.indexOf('/p>') + 3;
        var scrp = slcleft1.slice(i4, i5);
        if(scrp.includes('a href') == false){
          if(scrp.includes('Copyright') == false){
            mc.push(slcleft1.slice(i4, i5));
          }
        }
        slcleft1 = slcleft1.slice(i5, slcleft1.length);
      }

      var con = "";
      for (i = 0; i < mc.length; i++) {
          con += mc[i] + "\n";
      }

      document.getElementById('results').innerHTML = title + '\n' + con;
}



window.fbAsyncInit = function() {
  FB.init({
    appId      : '371244233242046',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

/*
function fshare() {
	var url = window.location.href;
	FB.ui({
	  method: 'share',
	  display: 'popup',
	  href: url,
	}, function(response){});
}
*/