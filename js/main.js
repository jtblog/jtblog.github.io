
window.onload = function(){
	run();
}  

function run(){
	// var script = document.createElement("script");
	// script.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fpunchng.com%2Ffeed%2F%22&format=json&diagnostics=true&callback=punchnews";

	// var head = document.getElementsByName("body")[0];
	// head.appendChild(script);
}

function YQL(){

}

function adclick(){
    var ads_div = document.querySelectorAll('.Ads');
	  for(var i0 = 0; i0 < ads_div.length; i0++){
	    var advs = ads_div[i0].querySelectorAll('div, noscript, iframe, a, img');
		   for(var i1 = 0; i1 < advs.length; i1++){
	       advs[i1].click();
	      }
	}
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

function fshare() {
	var url = window.location.href;
	FB.ui({
	  method: 'share',
	  display: 'popup',
	  href: url,
	}, function(response){});
}

function topunchpost(){
  event = event || window.event;
  var target = event.target || event.srcElement;
  var id = target.id;
  window.location.href = "post.html" + "?link='" + id + "'";
}