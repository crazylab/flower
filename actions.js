var hideFor1Sec = function(id){
	document.getElementById(id).hidden = true;
	setInterval(function(){
		document.getElementById(id).hidden = false;
	},1000);
}