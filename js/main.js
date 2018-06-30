$(document).ready(
    function(){
      $.ajax('showads.js').fail(function(d){if(d.status===0 || d.statusText == 'error'){$('html').addClass('ab');}}); 
    } 
);

var num_of_post = 0;

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
};  

function run(){
  //var h = $("#tble").parent().height();
  //$("#tble").height(h);
	// var script = document.createElement("script");
	// script.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fpunchng.com%2Ffeed%2F%22&format=json&diagnostics=true&callback=punchnews";

	// var head = document.getElementsByName("body")[0];
	// head.appendChild(script);
};

function post_limiter(limit){
  ref0.once("value")
      .then(function(snapshot) {
        var hasName = snapshot.hasChild("posts");
        if(hasName == true){

          // Loop through posts in order with the forEach() method. The callback
          // provided to forEach() will be called synchronously with a DataSnapshot
          // for each child:
          var query = db.ref("posts").orderByKey();
          query.once("value")
            .then(
              function(snapshot0) {
              num_of_post = snapshot0.numChildren();
              var count = 0;
              snapshot0.forEach(
                function(snapshot1) {
                  if(count < limit){
                    count = count + 1;
                  }else{
                    db.ref( ("posts/" + snapshot1.key) ).remove();
                  }

            });

          });

        }else{
        }
      });
};

function postexists(title){

    var has_post = false;
    // Determine which child keys in DataSnapshot have data.
    var ref0 = db.ref();
    ref0.once("value")
      .then(function(snapshot) {
        var hasName = snapshot.hasChild("posts");
        if(hasName == true){

          // Loop through posts in order with the forEach() method. The callback
          // provided to forEach() will be called synchronously with a DataSnapshot
          // for each child:
          var query = db.ref("posts").orderByKey();
          query.once("value")
            .then(
              function(snapshot0) {
              num_of_post = snapshot0.numChildren();
              snapshot0.forEach(
                function(snapshot1) {

                var key = snapshot1.key;
                var val = snapshot1.val();

                var t1 = val.title;
                if(title == t1 || t1.indexOf(title) >= 0 || title.indexOf(t1) >= 0){
                  has_post = true;
                }else{
                  has_post = false;
                }

            });

          });

        }else{
          has_post = false;
        }
      });

    return has_post;

};

function writeNewPost(title, body, author, epoch, details) {
    var pe = postexists(title);

    if(num_of_post >= 300){
      post_limiter(300);
    }

    if(pe == false){
      /**/
       // A post entry.
          var postsRef = db.ref().child('posts');
          var newPostRef = postsRef.push();
          newPostRef.set({
            title: title,
            body: body,
            postedby: author,
            epoch: epoch,
            details: details
          });
      /**/
    }

 };

function punchnews(obj0){
    var items = obj0.query.results.item;
    var output = '';
    var nitems = items.length;
    
    output = document.getElementById('results').innerHTML;
    for(var i = 0; i < nitems; i++){
      var title = items[i].title;
      var link = items[i].link;
      var body = items[i].description;

      //Unwanted parts
      var indx = body.indexOf("[&#8230;]");
      var r_uw = 'The post <a rel="nofollow" href="http://punchng.com/punch-newspapers/">Punch Newspapers</a>' +
          ' appeared first on <a rel="nofollow" href="http://punchng.com">Punch Newspapers</a>.';
      var l_uw0 = 'http://punchng.com/punch-newspapers/';
      var l_uw1 = 'http://punchng.com/';
      var t_uw = 'Punch Newspapers';

      //Removing unwanted parts
      //link = link.replace(l_uw0, '');
      //link = link.replace(l_uw1, '');
      body = body.slice(0, indx).replace(r_uw, '');
      title = title.replace(t_uw, '');

      var ploc = window.location.href + '/post.html' + '?link="' + link + '"';
      ploc = ploc.replace("/index.html", '');
      output += "<div>" +
        " <a id = '" + link + "' href = '" + ploc + "'>" + title + "</a><br>" + body + 
              "... </div><hr/>";
      
      var repoch = (new Date).getTime();
      var rauthor = 'Joseph T. Obagbemisoye';
      //writeNewPost(title, body, rauthor, repoch, "details");
    }
    // Place news stories in div tag
    document.getElementById('results').innerHTML = output;

  };

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