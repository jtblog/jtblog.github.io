window.fbAsyncInit = function() {
    FB.init({
      appId            : '371244233242046',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.0'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

$(document).ready(
    function(){
      $.ajax('showads.js').fail(function(d){if(d.status===0 || d.statusText == 'error'){$('html').addClass('ab');}}); 
    } 
);

var num_of_post = 0;
var iter0;
var index0 = 0;
var lst0 = [];

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
      lst0.push(link);

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
    clearTimeout(iter0);
              window.fbAsyncInit = function() {
                FB.init({
                  appId            : '371244233242046',
                  autoLogAppEvents : true,
                  xfbml            : true,
                  version          : 'v3.0'
                });
              };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
      iter0 = setTimeout(process0(link), 10000);
    document.getElementById('results').innerHTML = output;

  };
function process0(link){
  $.ajax({
      crossOrigin: true,
      url: link,
      success: function(res) {
        var data0 = JSON.stringify(res);
        process1(data0);
      }
    });
}

function process1(data){

      index0 = index0 + 1;

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

      var contnt = '\n' + con;
      contnt = contnt.replace(/\<h1 class="post_title">/g, '');
      contnt = contnt.replace(/\<\/h1>/g, '');
      contnt = contnt.replace(/\<p style="text-align: justify;">/g, '');
      contnt = contnt.replace(/\<strong>/g, '');
      contnt = contnt.replace(/\<\/strong>/g, '');
      contnt = contnt.replace(/\<\/p>/g, '\n');
      contnt = contnt.replace(/\<p>/g, '');
      contnt = contnt.replace(/\All rights reserved. This material, and other digital content on this website, may not be reproduced, published, broadcast, rewritten or redistributed in whole or in part without prior express written permission from PUNCH/g, '');      
      contnt = contnt.replace(/\<p class="header">/g, '');
      contnt = contnt.replace(/\<h1 class="post_title">/g, '');
      contnt = contnt.replace(/\&#8221;/g, '');
      contnt = contnt.replace(/\<em>/g, '');
      contnt = contnt.replace(/\<\/em>/g, '');
      contnt = contnt.replace(/\&#8217;/g, "'");
      contnt = contnt.replace(/\the PUNCH/g, 'JT Blog');
      /*<p class="header">
      &#8221;
      <em>
      </em>
      &#8217;   '
      &#8220;
      the PUNCH*/

      if(contnt.indexOf('>') > 0 && contnt.indexOf('<') > 0){
        contnt = "";
      }

      FB.api(
        '/222295591251319/feed',
        'POST',
        {"message":contnt, 
         "access_token": "EAAFRpQiltb4BAFai3lNeqkiDzLebTQRpykRgF93YVsF5ajZB3gmoG4y2i6ZCP55EQokcjPZATnd8Onr1ygNwmCQuqZCW6Cm1brerAWHeuDfoAEEPUNgCVf3YCUlxIGo9uf3rMfLsolaoM2u2wo5zKnlWxSmvpeZC9HNS8oaMIgwZDZD",
        },
          
        function(response) {
          //alert(JSON.stringify(response))
            // Insert your code here
        }
      );

      if(index0 < lst0.length){

        clearTimeout(iter0);
                window.fbAsyncInit = function() {
                  FB.init({
                    appId            : '371244233242046',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v3.0'
                  });
                };

                (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                 }(document, 'script', 'facebook-jssdk'));
        iter0 = setTimeout(process0(lst0[index0]), 10000);
      }else{
        clearTimeout(iter0);
                window.fbAsyncInit = function() {
                  FB.init({
                    appId            : '371244233242046',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v3.0'
                  });
                };

                (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                 }(document, 'script', 'facebook-jssdk'));
      }
      

};