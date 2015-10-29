var fs = require('fs');

var lib = {};
var act = {};
exports.lib = lib;
exports.act = act;
lib.getMethod = function(path){
	if(!path.match(/\?/g))
		return false;
	var lastSlash = path.lastIndexOf('/');
	var qnMark = path.indexOf('?');
	return path.substr(lastSlash + 1,qnMark - 1);
}
var seperateValue = function(data,result){
	data.forEach(function(boundedValue){
		var equalPosition = boundedValue.indexOf('=');
		var key = boundedValue.substr(0,equalPosition).replace(/\+/gi,' ');
		var value = boundedValue.substr(equalPosition + 1).replace(/\+/gi,' ');
		result[key] = value;
	});
}
lib.decomposePath = function(path){
	if(!lib.getMethod(path))
		return false;
	var result = {};
	var data = path.split('?')[1].split('&');
	seperateValue(data,result);
	return result;
}
lib.convertToString = function(object){
	return JSON.stringify(object) + '\r\n';
}
lib.hasKey = function(obj,key){
	return Object.keys(obj).indexOf(key) != -1;
}
lib.composeData = function(data){
	data = data.split('\r\n').reverse();
	data.splice(0,1);
	var comments = data.map(function(string){
		return JSON.parse(string);
	});
	var htmlFormat = comments.map(function(comment){
		return comment.time +' <b>'+comment.name +'</b><br>'+ comment.comment;
	}).join('<br><hr>');
	return htmlFormat + '<br>';
}
lib.getComments = function(){
	var allComments = fs.readFileSync('./comments.txt','utf8');
	return allComments;
}
//------------------------------------------------------------
act.addComment = function(commentData){
	if(!commentData.name || !commentData.comment)
		return;
	fs.appendFileSync('comments.txt',lib.convertToString(commentData));
}
act.getPage = function(path,response){
	if(path == '/guestbook.html'){
		var comments = lib.getComments();
		var guestbook = fs.readFileSync('./gbTemplate.html','utf8');
		var fullpage = guestbook + lib.composeData(comments) + '</body></html>';
		fs.writeFileSync('./guestbook.html',fullpage);
	}

	fs.readFile('.'+path,function(err,data){
		if (err)
			response.end('Not Found');
		response.end(data);
	});
}