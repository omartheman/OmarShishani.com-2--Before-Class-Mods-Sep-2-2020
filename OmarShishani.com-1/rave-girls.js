
$('.color-input-1').change(function(){
	$('.rave-girl-1').attr('src', 'pics/rave-girl-1-speech.png')
	$('.rave-girl-1').css('border', `1rem dotted ${$(this).val()}`)	
	$('.rave-girl-1').css('width', 'calc(100% - 2rem)')
});

$('.btn-1').click(function(){
	$('.rave-girl-pic-btn-1').toggleClass('visibility');	
});

