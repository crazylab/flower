var http = require('http');
var fs = require('fs');

var requestHandler = function (req, res) {
	var path = req.url;
	if(path == '/')
		path = '/index.html';
	console.log(path);
	var hasMethod = path.match(/\?/g) ? true : false;
	if(hasMethod){
		var method = path.split('?')[0].slice(1);
		var data = path.split('?')[1].split('&');
		var name = data[0].split("=")[1];
		var message = data[1].split("=")[1];
		var comment = {};
		comment[name] = message;
		var commentString = JSON.stringify(comment) + ',';
		fs.appendFile('comments.csv', commentString, function (err) {
  			if (err) throw err;
 		 	console.log('It\'s saved!');
		 	res.end('./guestbook.html');
		});
	}


	fs.readFile('.'+path,function(err,data){
		 if (err)
		 	res.end('Not Found');
		 res.end(data);
	});
}
http.createServer(requestHandler).listen(4000);