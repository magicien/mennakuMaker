$(function() {

$('#copymsg').blur(function(){
	$('#ccopy').html($('#copymsg').val());
	calcMovableArea();
});


$('#copymsg').keypress(function(e){
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		$('#ccopy').html($('#copymsg').val());
		calcMovableArea();
	}
});

	$('#ccopy').css('position', 'relative');
	$('#ccopy').css('left', trans.left+200+'px');
	$('#ccopy').css('top', trans.top-600+'px');
	$('#ccopy').css('fontSize', decoration.fontSize+'px');
	$('#ccopy').css('fontColor', '#'+decoration.color);
	$('#ccopy').css('text-shadow', 
			decoration.textShadow.x+'px '+decoration.textShadow.y+'px '+decoration.textShadow.blur+'px #'+decoration.textShadow.color);
	$('#ccopy').css('-webkit-writing-mode', 'vertical-rl');
	$('#ccopy').css('-webkit-transform', 'rotate\('+$('#input_rotate').val()+'deg\)');

	$('#input_left').blur(function(){
		$('#ccopy').css('left', parseInt($('#input_left').val())+200+'px');
		calcMovableArea();
	});

	$('#input_top').blur(function(){
		$('#ccopy').css('top', parseInt($('#input_top').val())-600+'px');
		calcMovableArea();
	});
	
	$('#input_size').change(function(){
		$('#ccopy').css('fontSize',parseInt($('#input_size').val())+'px');
		calcMovableArea();
	});

	$('#input_rotate').change(function(){
		$('#ccopy').css('-webkit-transform','rotate\('+$('#input_rotate').val()+'deg\)');
		calcMovableArea();
	});

});

