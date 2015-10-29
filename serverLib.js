var fs = require('fs');

var lib = {};
var act = {};
exports.lib = lib;
exports.act = act;
lib.getMethod = function(path){
	if(!path.match(/\?/g))
		return false;
	var lastSlash = path.lastIndexOf('/');
	var userRequest = path.slice(lastSlash + 1);
	var method = userRequest.split('?')[0];
	return method;
}
lib.decomposePath = function(path){
	if(!lib.getMethod(path))
		return false;
	result = {};
	result.method = lib.getMethod(path);
	var data = path.split('?')[1].split('&');
	var seperateValue = function(boundedValue){
		var equalPosition = boundedValue.indexOf('=');
		var key = boundedValue.substr(0,equalPosition);
		var value = boundedValue.substr(equalPosition + 1);
		result[key] = value;
	}
	data.forEach(seperateValue);
	return result;
}
lib.convertToString = function(object){
	return JSON.stringify(object) + '\r\n';
}
lib.hasKey = function(obj,key){
	return Object.keys(obj).indexOf(key) != -1;
}
lib.composeData = function(data){
	data = data.split('\r\n');
	data.splice(data.length - 1,1);
	var comments = data.map(function(string){
		return JSON.parse(string);
	});
	var htmlFormat = comments.map(function(comment){
		return comment.name+'<br>'+comment.comment;
	}).join('<br>');
	return htmlFormat + '<br>';
}
lib.getComments = function(){
	return fs.readFileSync('./comments.txt','utf8');
}
//------------------------------------------------------------
act.addComment = function(commentData){
	fs.appendFile('comments.txt',lib.convertToString(commentData));
}
act.getPage = function(path,response){
	if(path == '/guestbook.html'){
		var comments = lib.getComments();
		console.log(comments)
		fs.appendFile('guestbook.html',lib.composeData(comments) + '</body></html>');
	}

	fs.readFile('.'+path,function(err,data){
		if (err)
			response.end('Not Found');
		response.end(data);
	});
}