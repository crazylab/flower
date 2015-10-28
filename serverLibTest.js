var assert = require('assert');
var m = require('./serverLib.js').lib;

var test = {};
exports.test = test;

test["isMethodAvaiable gives boolean value depended upon the availability of method on the path"] = function(){
	assert.equal(true,m.isMethodAvaiable('/add?a=20'));
	assert.equal(false,m.isMethodAvaiable('/home.html'));
}
test["decomposePath gives method name and available variable values when method is available to the path"] = function(){
	assert.equal('add',m.decomposePath('/add?a=5').method);
	assert.equal(false,m.decomposePath('/home.html'));

	assert.equal(15,m.decomposePath('/add?a=15').a);
	assert.equal(20,m.decomposePath('/add?a=15&b=20').b);
}
test["convertToCSV convert object to string and adds a comma after it"] = function(){
	assert.equal('{"a":8},',m.convertToCSV({a: 8}));
}