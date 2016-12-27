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
		        "Content-Type": "application/xml"
		    },
		    url : "http://punchng.com/feed/",
		   	dataType : "xml",

		   	success : function ( resp ) {
		   		alert("success");
		    } 

	});
}