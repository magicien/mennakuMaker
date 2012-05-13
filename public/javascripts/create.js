
$(function(){
	$('td#comment a').click(function(){
		$.getJSON($(this).attr('href')).then(function(comment){
			$('#message').val(comment.message);
			$('#message').trigger('change');
		});
		return false;
	});
	$('#message, #imageUri').bind('change',function(){
		var enable = false;
		if($('#imageUri').val() === '' || $('#message').val() === ''){
			enable=false;
		}else{
			enable=true;
		}
		$('#sumbnail').attr('src', $('#imageUri').val()).bind('load', function(){
			console.log('load');
		});
		if(enable){
			$('#createBtn').removeAttr('disabled');
		}else{
			$('#createBtn').attr('disabled', 'disabled');
		}
	
	});
});

