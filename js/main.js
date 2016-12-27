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
		        'application/x-www-form-urlencoded; charset=UTF-8'
		    },
		    url : "http://punchng.com/feed/",
		   	dataType : "xml",

		   	success : function ( resp ) {
		   		alert("success");
		    } 
	});
}