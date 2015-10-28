var lib = {};
exports.lib = lib;
lib.decomposePath = function(path){
	var result = {method: null, name: null, message: null};
	return path.match(/\?/g) ? true : false;
}