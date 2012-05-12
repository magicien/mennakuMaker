$('#copymsg').blur(function(){
	$('#ccopy').html($('#copymsg').val());
});


$('#copymsg').keypress(function(e){
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		$('#ccopy').html($('#copymsg').val());
	}
});

/*
$(function(){
	//var $('TODO ID').val($('#ccopy').css('-webkit-transform')
	var transform = $('#ccopy').css('-webkit-transform');

});
*/
