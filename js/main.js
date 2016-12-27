window.onload = function(){
	run();
}  

function run(){
	if (typeof YUI !== 'undefined' && $.isFunction(YUI)) {
	    alert('Yeah');
	 }elses{
	 	alert('Nope');
	 }
}