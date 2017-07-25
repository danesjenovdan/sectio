$(document).ready(function() {
	$('#startbutton').click(function() {
		mixpanel.track('sidestart');
		setStart();
	});
	$('#endbutton').click(function() {
		mixpanel.track('sideend');
		setendd();
	});
	$('#loopit').click(function() {
		setLoop();
	});
});
