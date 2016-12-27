window.onload = function(){
	run();
}  

function run(){
	$.ajax({
        type: "GET",
        url:'https://news.google.com/?output=rss',   
        dataType: "jsonp",
        //contentType: "text/xml; charset=utf-8",
        headers: { "Access-Control-Allow-Origin":"*",},                

        success: function(xml) {
        alert("success");
        }   
	});
}