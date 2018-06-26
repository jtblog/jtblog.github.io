
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
	// var script = document.createElement("script");
	// script.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fpunchng.com%2Ffeed%2F%22&format=json&diagnostics=true&callback=punchnews";

	// var head = document.getElementsByName("body")[0];
	// head.appendChild(script);
}

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
              snapshot0.forEach(
                function(snapshot1) {

                var key = snapshot1.key;
                var t0 = "posts/" + key;
                var ref1 = db.ref(t0);

                ref1.once("value")
                  .then(function(snapshot2) {
                    //var key = snapshot2.key;
                    var t1 = snapshot2.child("title").val();
                    if(title == t1 || t1.indexOf(title) >= 0 || title.indexOf(t1) >= 0){
                      has_post = true;
                    }else{
                      has_post = false;
                    }

                  });

            });

          });

        }else{
          has_post = false;
        }
      });

      return has_post;

}

function writeNewPost(title, body, author, epoch, fulltext) {

    if(postexists == false){
      /**/
       // A post entry.
          var postsRef = db.ref().child('posts');
          var newPostRef = postsRef.push();
          newPostRef.set({
            title: title,
            body: body,
            postedby: author,
            epoch: epoch,
            fulltext: fulltext
          });
      /**/
    }

 }

function punchnews(obj0){
    var items = obj0.query.results.item;
    var output = '';
    var nitems = items.length;
    
    output = document.getElementById('results').innerHTML;
    for(var i = 0; i < nitems; i++){
      var title = items[i].title;
      var link = items[i].link;
      var desc = items[i].description;
      var indx = desc.indexOf("[&#8230;]");
      var r_desc = 'The post <a rel="nofollow" href="http://punchng.com/punch-newspapers/">Punch Newspapers</a>' +
          ' appeared first on <a rel="nofollow" href="http://punchng.com">Punch Newspapers</a>.';
      var l_desc = 'http://punchng.com/punch-newspapers/';
      var t_desc = 'Punch Newspapers';
      output += "<div><input id = '" + link.replace(l_desc, '') + "' onclick = 'topunchpost()' style='color: blue; text-decoration: underline'>" + 
              title.replace(t_desc, '') + "/><br>" + desc.slice(0, indx).replace(r_desc, '') + "... </div><hr/>";
      
      var repoch = (new Date).getTime();
      var rtitle = title.replace(t_desc, '');
      var rbody = desc.slice(0, indx).replace(r_desc, '');
      var rauthor = 'Joseph T. Obagbemisoye';
      //writeNewPost(rtitle, rbody, rauthor, repoch, fulltext);
    }
    // Place news stories in div tag
    document.getElementById('results').innerHTML = output;

  }

/*
function adclick(){
    var ads_div = document.querySelectorAll('.Ads');
	  for(var i0 = 0; i0 < ads_div.length; i0++){
	    var advs = ads_div[i0].querySelectorAll('div, noscript, iframe, a, img');
		   for(var i1 = 0; i1 < advs.length; i1++){
	       advs[i1].click();
	      }
	}
  }
*/
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

function topunchpost(){
  event = event || window.event;
  var target = event.target || event.srcElement;
  var id = target.id;
  window.location.href = "post.html" + "?link='" + id + "'";
}