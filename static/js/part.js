var loop = -1; // NEW (needs to be read from the API) //
$(document).ready(function() {
	$("#shortened").select();
	if (((($('#player').width() )/16*9) - 200) > 50) { 
		$('#about').css( 'padding-top', ((($('#player').width())/16*9) - 385)); 
	}
	$('#replay').click(function() { // NEW //
		_gaq.push(['._setCustomVar', 5, 'Clicked Cutit', 'yes', 2]);
		replay();
	}); 
});


var start;
var end;
var ID = 'ZDxld53bBIk';
// TODO: iz URLja pobrati parametre start, end, ID

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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

//////////////////////////////////////////////

function played() {
	position = player.getCurrentTime();
	value = position * lengthofsecond;
	if (start) {
		if (end) {
		}
		else {
			$('#slider').slider({
				values : [start, value]
			});			
		}
	}
	else {
		$('#slider').slider({
			values : [value, value]
		});
	}
}

function setStart() {
	start = player.getCurrentTime() * lengthofsecond;
	$('#startbutton').toggleClass('on');
}

function setEnd() {
	if (start) {
		end = player.getCurrentTime() * lengthofsecond;
		$('#endbutton').toggleClass('on');
	}
	else {
		alert('You should start first.');
	}
}

function replay() { // NEW //
	mixpanel.track('replay');
	player.seekTo(start, true);
	player.playVideo();
}

$(document).ready(function() {
	mixpanel.register({'landing' : 'part'});
	mixpanel.track_links('#cutyourown a', 'cutyourown');
	mixpanel.track_links('.logo', 'logo');
});