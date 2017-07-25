function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		height: '100',
		width: '200',
		videoId: 'ZDxld53bBIk',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady() {
}

function onPlayerStateChange() {
}