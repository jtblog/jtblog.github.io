window.onload = function(){
	run();
}  

function run(){
	getFEED('http://punchng.com/feed/', function(request){
	    var response = request.currentTarget.response || request.target.responseText;
	    alert(JSON.stringify(response));
	});
}

function getFEED(url, success) {
    var xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}
