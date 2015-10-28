var fs = require('fs');

var lib = {};
exports.lib = lib;

lib.isMethodAvaiable = function(path){
	return path.match(/\?/g) ? true : false;
}
lib.decomposePath = function(path){
	if(!lib.isMethodAvaiable(path))
		return false;
	result = {};
	result.method = path.split('?')[0].slice(1);
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
lib.convertToCSV = function(object){
	return JSON.stringify(object) + ',';
}
lib.addComment = function(commentData,response){
	var onError = function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	 	response.end('./guestbook.html');
	}
	fs.appendFile('comments.csv', lib.convertToCSV(commentData), onError);
	response.end('./guestbook.html');
}