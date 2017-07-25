// globals
var start;
var end;
var oldstart;
var oldend;
var position;

//vimeo globals
var iframe;
var player;

$(document).ready(function() {
	// VIMEO //
	
	iframe = $('#player')[0];
	player = $f(iframe);
	
	// When the player is ready, add listeners for pause, finish, and playProgress
	player.addEvent('ready', ready);
	
	// VIMEO //
	$('#player').height(($('#player').width())/16*9);
	if (((($('#player').width() )/16*9) - 200) > 50) { // CHANGE
		$('#context').css( 'height', ((($('#player').width())/16*9) - 200)); // CHANGE
	} // CHANGE
	$('#cutit').click(function() {
		cutit();
	});
	$('.timeinput').change(function() {
		$('#startbutton').attr('class', 'on');
		$('#endbutton').attr('class', 'on');
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(even)').css('background-position', '0% 0%');
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(odd)').css('background-position', '100% 100%');
		start = ($('#startmin').val() * 60) + $('#startsec').val() * 1;
		end = ($('#endmin').val() * 60) + $('#endsec').val() * 1;
		$('#slider').slider('option', 'values', [start*lengthofsecond, end*lengthofsecond]);
	});
});

function onPlayProgress(data) {
	played(data.seconds);
}

function onPlay() {
	//beeper = self.setInterval('played()', 10);
}

function onPause() {
	//clearInterval(beeper);
}

function ready() {
//    player.addEvent('playProgress', onPlayProgress);
    
    player.addEvent('play', onPlay);
    player.addEvent('pause', onPause);
    progress = 0;
    duration = player.api('getDuration');
    lengthofsecond = 100/duration;
    $(document).ready(function() {
    	$('#slider').slider({
    		create: function(event, ui) {
    			$('#slider .ui-slider-range').mousedown(function() {
    				preview();
    			    return false;
    			});
    			$('#slider .iu-slider-range').mouseover(function() {
    				alert('over');
    				return false;
    			});
    		},
    		start: function(event, ui) {
    			if(!start) {
    				setStart();
    			}
    			else if (!end) {
    				setEnd();
    			}
    			else {
    				// to make the padding on second handle work as a preview as well //
    				preview();
    			}
    		},
    		slide: function(event, ui) {
    			player.pauseVideo();
    			values = $("#slider").slider( "option", "values" );
    			start = Math.floor(values[0]/lengthofsecond);
    			$('#startmin').val(getMin(start));
    			$('#startsec').val(getSec(start));
    			end = Math.floor(values[1]/lengthofsecond);
    			$('#endmin').val(getMin(end));
    			$('#endsec').val(getSec(end));
    			if (oldstart == start) {
    				player.seekTo(end, true);
    			}
    			if (oldend == end) {
    				player.seekTo(start, true);
    			}
    			if (values[1] > 73) {
    				$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(odd)').css('padding-right', 100-values[1]);
    			}
    			oldstart = start;
    			oldend = end;
    		},
    		range : true,
    		values : [0 , 0],
    		step : lengthofsecond
    	});
    	$('.ui-slider-range.ui-widget-header').attr('id', 'range');
    });
    // all is ready, play video
    player.api('play');
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		beeper = self.setInterval('played()', 10);
	}
	if (event.data == YT.PlayerState.PAUSED) {
		clearInterval(beeper);
	}
}

// function called every 10ms through beeper - moves slider //
function played(position) {
//	position = Math.floor(player.api('getCurrentTime'));
	value = position * lengthofsecond;
	if (start) {
		if (end) {
		}
		else {
			$('#slider').slider({
				values : [start*lengthofsecond, value]
			});			
		}
	}
	else {
		$('#slider').slider({
			values : [value, value]
		});
	}
}

// called at click on slider without start being set //
function setStart() {
	if (!start) {
		start = Math.floor(player.getCurrentTime());
		$('#startbutton').toggleClass('on');
//		$('#startmin').css('border-color', '#df4301'); CHANGE
//		$('#startsec').css('border-color', '#df4301'); to dvoje mora letet ven
		$('#startmin').val(getMin(start));
		$('#startsec').val(getSec(start));
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(even)').css('background-position', '0px 1px');
	}
}

// called at click on slider with start already set //
function setEnd() {
	if (start) {
		if (!end) {
			$('#endbutton').toggleClass('on');
		}
		player.pauseVideo();
		end = Math.floor(player.getCurrentTime());
//		$('#endmin').css('border-color', '#df4301'); CHANGE
//		$('#endsec').css('border-color', '#df4301'); to dvoje mora ven letet
		$('#endmin').val(getMin(end));
		$('#endsec').val(getSec(end));
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(odd)').css('background-position', '100% 100%');
	}
	else {
		alert('You should start first.');
	}
}

function getMin(seconds) {
	m = Math.floor(seconds / 60);
	return m;
}

function getSec(seconds) {
	s = Math.floor(seconds % 60);
	return s;
}

// function to reapply slider when entering time //
// TODO pogovoriti se moramo točno kako bi to najlepše naredili //

// CUT IT! button functions //
function cutit() {
	context = $('#context').val();
	// start and end exist //
	if (start && end) {
		//POST videoID, start, end, context	
	} 
	// only start exists //
	else if (start) {
		//POST videoID, start, context
	}
	//nothing exists :P //
	else {
		alert('You should cut the crap first, share later.');
	}
}

//preview function
function preview() {
	player.playVideo();
	player.seekTo(start, true);
	previewer = self.setInterval(function() {
		now = Math.floor(player.getCurrentTime());
		if (now >= end) {
			player.pauseVideo();
			clearInterval(previewer);
		}
	}, 1000);
}
