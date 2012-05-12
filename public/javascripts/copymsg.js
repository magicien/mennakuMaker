$(function() {

$('#copymsg').blur(function(){
	$('#ccopy').html($('#copymsg').val());
	updateMessagePosition();
});


$('#copymsg').keypress(function(e){
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		$('#ccopy').html($('#copymsg').val());
		updateMessagePosition();
	}
});

	$('#ccopy').css('position', 'relative');
	$('#ccopy').css('left', trans.left+200+'px');
	$('#ccopy').css('top', trans.top-600+'px');
	$('#ccopy').css('fontSize', decoration.fontSize+'px');
	$('#ccopy').css('color', decoration.color);
	$('#ccopy').css('text-shadow', 
			parseInt(decoration.textShadow.x)+'px '+parseInt(decoration.textShadow.y)+'px '+parseInt(decoration.textShadow.blur)+'px '+decoration.textShadow.color);
	$('#ccopy').css('-webkit-writing-mode', 'vertical-rl');
	$('#ccopy').css('-webkit-transform', 'rotate\('+$('#input_rotate').val()+'deg\)');

	$('#input_left').blur(function(){
		$('#ccopy').css('left', parseInt($('#input_left').val())+200+'px');
		updateMessagePosition();
	});

	$('#input_top').blur(function(){
		$('#ccopy').css('top', parseInt($('#input_top').val())-600+'px');
		updateMessagePosition();
	});
	
	$('#getcopy').click(function(){
		$.getJSON('/comment/random').then(function(comment){
			$('#copymsg').val(comment.message);
			$('#ccopy').html(comment.message);
		});

	});
	
	$('#input_size').change(function(){
		$('#ccopy').css('fontSize',parseInt($('#input_size').val())+'px');
		updateMessagePosition();
	});

	$('#input_rotate').change(function(){
		$('#ccopy').css('-webkit-transform','rotate\('+$('#input_rotate').val()+'deg\)');
		updateMessagePosition();
	});
	
	$(function(){
		$('#color1').ColorPicker({
			onChange:function (hsb, hex, rgb) {
				$('#color1 div.inner').css('backgroundColor', '#' + hex);
	                        $('#ccopy').css('color', '#' + hex);
	       }
              });
        });

	$(function(){
		$('#color2').ColorPicker({
			onChange:function (hsb, hex, rgb) {
				$('#color2 div.inner').css('backgroundColor', '#' + hex);
	                        $('#ccopy').css('text-shadow', parseInt(decoration.textShadow.x)+'px '+parseInt(decoration.textShadow.y)+'px '+parseInt(decoration.textShadow.blur)+'px #' + hex);
	       }
              });
        });

/*
	$('#update_btn').click(function(){

	});
	*/

	$('#update').click(updateSnap);

});
var updateSnap = function(){
	$.ajax({
		type:'PUT',
		url:location.href,
		data:{
			message: $('#copymsg').val(),
			transleft: $('#input_left').val(),
			transtop: $('#input_top').val(),
			transrotate: $('#input_rotate').val(),
			decoFontSize: $('#input_size').val(),
			decoColor: $('#color1 div.inner').css('backgroundColor'),
			decoShadowColor: $('#color2 div.inner').css('backgroundColor')
		}
	}).then();
};
