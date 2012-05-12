function copymsg() {
	var msg = document.getElementById('copymsg').value;
	document.getElementById('ccopy').innerHTML = msg;

	alert(document.getElementById('ccopy').cssText);
}
