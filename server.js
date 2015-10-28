var http = require('http');
var fs = require('fs');
var lib = require('./serverLib.js').lib;

var requestHandler = function (req, res) {
	var path = req.url;
	if(path == '/')
		path = '/index.html';
	console.log(path);
	if(lib.isMethodAvaiable(path)){
		var userRequest = lib.decomposePath(path);
		var comment = {
			name : userRequest.name,
			comment : userRequest.comment
		};
		lib[userRequest.method](comment,res);
	}
	fs.readFile('.'+path,function(err,data){
		 if (err)
		 	res.end('Not Found');
		 res.end(data);
	});
}
http.createServer(requestHandler).listen(4000);