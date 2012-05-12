
$(function(){
	$('td#comment a').click(function(){
		$.getJSON($(this).attr('href')).then(function(comment){
			$('#message').val(comment.message);
			$('#message').trigger('change');
		});
		return false;
	});
	$('#message, #imageURI').bind('change',function(){
		var enable = false;
		if($('#imageUri').val() === '' || $('#message').val() === ''){
			enable=false;
		}else{
			enable=true;
		}
		if(enable){
			$('#createBtn').removeAttr('disabled');
		}else{
			$('#createBtn').attr('disabled', 'disabled');
		}
	});
});

