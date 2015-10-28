var assert = require('assert');
var m = require('./serverLib.js').lib;

var test = {};
exports.test = test;

test["decomposePath gives false when no method is available in path"] = function(){
	assert.equal(false,m.decomposePath('/home.html'));
}