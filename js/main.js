window.onload = function(){
      
  YUI().use('yql', function(Y) {

    var q = Y.YQL('select * from rss where url="http://punchng.com/feed/"', function(r) {
        var items = r.query.results.item;
                  var output = '';
                  var no_items=items.length;
                  
                  output = document.getElementById('results').innerHTML;
                  for(var i = 0; i<no_items; i++){
                    var title = items[i].title;
                    var link = items[i].link;
                    var desc = items[i].description;
                    output += 
			        "<div><a href='" + link + "'>" + title + "</a></div>" + desc + "<hr/>";
				  }
				  
				  document.getElementById('sidebar').innerHTML = output;
    });
	
    q.send();
});

}  