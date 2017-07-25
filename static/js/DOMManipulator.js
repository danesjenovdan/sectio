$(document).ready(function () {
	$('#vidmo-ui').append('<div id="background" onclick="record()"></div>');
	$('#background').css({'background-color' : 'black', 'width' : '640px', 'height' : '100px', 'display' : 'block'}); 
	$('#background').append('<div id="progress"></div>');
	$('#progress').css({'background-color' : 'blue', 'width' : '0px', 'height' : '100px', 'display' : 'block'}); 
	$('#background').append('<div id="record">record</div>');
	$('#record').css({'float' : 'right', 'position' : 'relative', 'top' : '-50px', 'color' : 'red', 'padding-right' : '50px', 'z-index' : '100'});
	$('#background').append('<div id="recorded"></div>');
	$('#recorded').css({'background-color' : 'yellow', 'width' : '0px', 'height' : '100px', 'display' : 'block', 'position' : 'relative', 'top' : '-100px'}); 
	$('#vidmo-ui').append('<div id="loaded"></div>');
	$('#loaded').css({'background-color' : 'red', 'width' : '0px', 'height' : '50px', 'display' : 'block', 'position' : 'relative'}); 
});