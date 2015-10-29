var http = require('http');
var fs = require('fs');
var lib = require('./serverLib.js').lib;
var act = require('./serverLib.js').act;

var requestHandler = function (req, res) {
	var path = req.url;
	if(path == '/')
		path = '/index.html';
	console.log(path);
	if(lib.getMethod(path)){
		var userRequest = lib.decomposePath(path);
		var comment = {
			name : userRequest.name,
			comment : userRequest.comment
		};
		lib.hasKey(act,userRequest.method) && act[userRequest.method](comment);
		path = '/guestbook.html'; 			//Need to change here
	}
	act.getPage(path,res);
}
http.createServer(requestHandler).listen(4000);