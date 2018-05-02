window.onload = function(){
	run();
}  

function run(){
	  //alert('Yeah');
}

function YQL(){

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