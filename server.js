var http = require('http');
var fs = require('fs');
var lib = require('./serverLib.js').lib;
var act = require('./serverLib.js').act;

var submitComment = function(){
	
}
var requestHandler = function (req, res) {
	var path = req.url;
	if(path == '/')
		path = '/index.html';
	var isCommentMethod = path.match(/\/guestbook.html\?/g) ? true : false;
	if(isCommentMethod){
		var userRequest = lib.decomposePath(path);
		var date = new Date();
		var comment = {
			time : date.toLocaleDateString() +'\t'+ date.toLocaleTimeString(),
			name : userRequest.name,
			comment : userRequest.comment,
		};
		act.addComment(comment);
		path = "/guestbook.html";
	}
	act.getPage(path,res);
}
http.createServer(requestHandler).listen(4000);