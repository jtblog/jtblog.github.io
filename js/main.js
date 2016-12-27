window.onload = function(){
	run();
}  

function run(){

	$.ajax( {

	  		method : 'GET',
			crossDomain : true,
		    xhrFields : {
		        withCredentials: true
		    },
		    headers : {
		        "Content-Type": "application/json",
	      		"Accept": "application/vnd.github.v3.full+json"
		    },
		    url : "http://punchng.com/feed/",
		   	dataType : "json",

		   	success : function ( resp ) {
		   		alert("success");
		    } 

	});
}