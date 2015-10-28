var hide = function(second,id){
	document.getElementById(id).hidden = true;
	setInterval(function(){
		document.getElementById(id).hidden = false;
	},second * 1000);
}