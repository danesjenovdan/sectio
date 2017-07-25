// GET TIME: $('iframe').smilepm(function(api) {console.log(api.get_time().then(function(result) {alert(result)}));});
// TODO
// Dolocanje IDja
// Start/stop
// Inject smile library
// v viidea.js se mora postimati post request !!!

/*<iframe scrolling="no" marginheight="0" marginwidth="0" src="http://hekovnik.openlectures.net/intelektualno_raz_lastninjenje_evrope_2020/video/1/iframe/" frameborder="0" height="270px" width="100%"></iframe>*/

function starter() {
	console.log('injected smilepm');
	$('#viidea').smilepm(function(api) {api.play();});
	console.log('played');
	$('#viidea').smilepm(function(api) {api.seek(start);});
	console.log('seeked');
	beeper = self.setInterval(ender(), 500);
	console.log('set beeper');		
}

// inject viidea library TODO
function injectsmile() {
	var ss = document.createElement('script');
	ss.src = 'http://video.hekovnik.si/site/media/static/smileplayer/smilepm.min.js';
	ss.onload = function() {
		console.log('smile injected');
		$('#viidea').smilepm(function(api) {
			console.log('called first smilepm');
			setTimeout(function() {
				api.wait_init(function() {
					console.log('injected smilepm');
					$('#viidea').smilepm(function(api) {api.play();});
					console.log('played');
					$('#viidea').smilepm(function(api) {api.seek(start);});
					console.log('seeked');
					beeper = self.setInterval('ender()', 500);
					console.log('set beeper');
				})
			}, 1000);
		});
	};
	(document.head||document.documentElement).appendChild(ss);
	/*
var a = document.createElement('script');
	a.src = 'http://video.hekovnik.si/site/media/static/smileplayer/smilepm.min.js';
	a.onload = function() {
		console.log('injected smilepm');
//		$('iframe').smilepm(function(api) {api.play();});
	}
	(document.head||document.documentElement).appendChild(a);
*/
}

function injectunderscore() {
	var ss = document.createElement('script');
	ss.src = 'http://sect.io/static/js/underscore.js';
	ss.onload = function() {
		console.log('underscore injected');
		injectsmile();
	};
	(document.head||document.documentElement).appendChild(ss);
}

function injectiframe() {
	ID = $('#url_f').val();
//	ID = 'intelektualno_raz_lastninjenje_evrope_2020' //TODO see next line
	$('#player').append('<iframe id="viidea" scrolling="no" marginheight="0" marginwidth="0" src="' + ID + 'video/1/iframe/" frameborder="0" height="450px" width="100%"></iframe>');
	console.log('iframe injected');
	injectunderscore()
}

function ender() {
	console.log('about to check for time');
	$('#viidea').smilepm(function(api) {api.get_time().then(function(result) {now = result;});});
	console.log(now);
	loop = $("#loop").val();
	if (now >= end) {
		if (loop < 1) {
			$('#viidea').smilepm(function(api) {api.pause()}); //TODO
			clearInterval(beeper);
		}
		else {
			replay();
		}
	}
}

function replay() {
	console.log('called replay');
	$('iframe').smilepm(function(api) {api.seek(start);});
	$('iframe').smilepm(function(api) {api.play();});
	beeper = self.setInterval('ender()', 100);
}

var now;
var beeper;
$(document).ready(function() {
	var loop = -1;
	start = $('#start').val();	
	end = $('#end').val();
	injectiframe();
});

/////////////////////////////////////////////////////////////////
/*

var loop = -1; // NEW (needs to be read from the API) //
$(document).ready(function() {
	var e = purl($('#url_f').val());
	ID = 'intelektualno_raz_lastninjenje_evrope_2020' //TODO see next line
//	ID = e.data.param.query.v;
	$('#player').append('<iframe scrolling="no" marginheight="0" marginwidth="0" src="http://video.hekovnik.si/' + ID + '/video/1/iframe/" frameborder="0" height="450px" width="100%"></iframe>');

	// TODO CODING

	player.on('initialized', function() {
		start = $("#start").val();
		end = $("#end").val();
		player.seek(start*1000);
		player.play();
		beeper = self.setInterval('ender()', 1000);
	});

	// END TODO CODING

	$("#shortened").select();
	if (((($('#player').width() )/16*9) - 200) > 50) { 
		$('#about').css( 'padding-top', ((($('#player').width())/16*9) - 385)); 
	}
	$('#replay').click(function() { // NEW //
		_gaq.push(['._setCustomVar', 5, 'Clicked Cutit', 'yes', 2]);
		replay();
	});
	 
});

function ender() {
	now = player.get_time(); //TODO
	loop = $("#loop").val();
	if (now >= end) {
		if (loop < 1) {
			player.pause(); //TODO
			clearInterval(beeper);
		}
		else {
			replay();
		}
	}
}

function replay() {
	player.seek(start); //TODO
	player.play(); //TODO
}

var start;
var end;
var ID;
*/
// TODO: iz URLja pobrati parametre start, end, ID

/*
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
*/

/*
function onYouTubePlayerAPIReady() {

var e = purl($("#url_f").val());
var uurl = e.data.attr.host;
if ( (uurl == 'www.youtube.com') | (uurl == 'youtube.com') ) {
    
    if (e.data.param.query.v != '') {
        ID = e.data.param.query.v;
    }else{
       
    }
    
}else if( (uurl == 'www.youtu.be') | (uurl == 'youtu.be') ){
    
    ID = e.data.seg.path[0];

}else if( (uurl == 'www.vimeo.com') | (uurl == 'vimeo.com') ){

}else{

}



	player = new YT.Player('player', {
		height: ($('#player').width())/16*9,
		width: '100%',
		videoId: ID,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
*/

/*
function onPlayerReady(event) {
	start = $("#start").val();
	end = $("#end").val();
	player.playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		beeper = self.setInterval('starter()', 10);
	}
	if (event.data == YT.PlayerState.PAUSED) {
		clearInterval(beeper);
	}
}

beeped = false;
function starter() {
	now = player.getCurrentTime();
	if (now > 0 && !beeped) {
		clearInterval(beeper);
		beeped = true;
		onVideoStarted();
	}
}

function ender() {
	now = player.getCurrentTime();
	loop = $("#loop").val();
	if (now >= end) {
		if (loop < 1) {
			player.pauseVideo();
			clearInterval(beeper);
		}
		else {
			replay();
		}
	}
}

function onVideoStarted() {
	player.seekTo(start, true);
	clearInterval(beeper);
	beeper = self.setInterval('ender()', 1000);
}

function replay() { // NEW //
	player.seekTo(start, true);
	player.playVideo();
}
*/