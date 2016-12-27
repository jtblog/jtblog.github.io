window.onload = function(){
	run();
}  

function run(){
	$.get("http://punchng.com/feed/").done(function (data) {
	    alert(JSON.stringify(data));
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
