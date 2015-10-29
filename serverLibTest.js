var assert = require('assert');
var m = require('./serverLib.js').lib;

var test = {};
exports.test = test;

test["getMethod gives method value depended upon the availability of method on the path"] = function(){
	assert.equal('add',m.getMethod('/add?a=20'));
	assert.equal(false,m.getMethod('/home.html'));
}
test["decomposePath gives available variable values when method is available to the path"] = function(){
	assert.equal(false,m.decomposePath('/home.html'));

	assert.equal(15,m.decomposePath('/add?a=15').a);
	assert.equal(20,m.decomposePath('/add?a=15&b=20').b);
}
test["convertToString convert object to string and adds a comma after it"] = function(){
	assert.equal('{"a":8}\r\n',m.convertToString({a: 8}));
}
test["composeData gives data in string form with"] = function(){
	var data = '{"name":"rahul","comment":"hello"}\r\n{"name":"vijaya","comment":"byebye"}\r\n';
	var expected = 'rahul<br>hello<br>vijaya<br>byebye<br>';
	assert.equal(expected,m.composeData(data))
}