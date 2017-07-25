// TODO input fields update slider
var start = -1;
var endd;
var videoID = 'ZDxld53bBIk'
var oldstart;
var oldendd;
var loop = -1;
var beeper;

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function() {
	mixpanel.track('loadcutit');
	if (((($('#player').width() )/16*9) - 200) > 50) {
		$('#context').css( 'height', ((($('#player').width())/16*9) - 276));
	}
	videoID = $("#url_c").val();
	$('#cutit').click(function() {
		mixpanel.track('cut');
		console.log('cut');
		cutit();
	});
	$('.timeinput').change(function() {
		mixpanel.track('inputbyhand');
		$('#startbutton').attr('class', 'on');
		$('#endbutton').attr('class', 'on');
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(even)').css('background-position', '0% 0%');
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(odd)').css('background-position', '100% 100%');
		start = ($('#startmin').val() * 60) + $('#startsec').val() * 1;
		endd = ($('#enddmin').val() * 60) + $('#enddsec').val() * 1;
		$('#slider').slider('option', 'values', [start*lengthofsecond, endd*lengthofsecond]);
	});
	$('#context').change(function() {
		mixpanel.track('enteredcontext');
	});
});

function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		height: ($('#player').width())/16*9,
		width: '100%',
		videoId: videoID,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	progress = 0;
	lengthofsecond = 100/player.getDuration();
	$('#slider').slider({
			create: function(event, ui) {
				$('#slider .ui-slider-range').mousedown(function() {
					preview();
				    return false;
				});
				$('#slider .ui-slider-range').mouseover(function() {
					alert('over');
					return false;
				});
			},
			start: function(event, ui) {
				console.log('slider: start');
				console.log('endd ' + endd);
				console.log('start ' + start);
				if(start < 1) {
					setStart();
				}
				else if (!endd) {
					setendd();
				}
				else {
					// to make the padding on second handle work as a preview as well //
					preview();
				}
			},
			stop: function(event, ui) {
				mixpanel.track('slid');
			},
			slide: function(event, ui) {
				player.pauseVideo();
				values = $("#slider").slider( "option", "values" );
				start = Math.floor(values[0]/lengthofsecond);
				$('#startmin').val(getMin(start));
				$('#startsec').val(getSec(start));
				endd = Math.floor(values[1]/lengthofsecond);
				$('#enddmin').val(getMin(endd));
				$('#enddsec').val(getSec(endd));
				if (oldstart == start) {
					player.seekTo(endd, true);
				}
				if (oldendd == endd) {
					player.seekTo(start, true);
				}
				if (values[1] > 73) {
					$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(odd)').css('padding-right', 100-values[1]);
				}
				oldstart = start;
				oldendd = endd;
			},
			range : true,
			values : [0 , 0],
			step : 1
		});
	$('.ui-slider-range.ui-widget-header').attr('id', 'range');
	// all is ready, play video
	player.playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		beeper = self.setInterval('played()', 10);
		console.log(player.getDuration());
		lengthofsecond = 100/player.getDuration();
		$('#slider').slider({step: 100/player.getDuration()});
	}
	if (event.data == YT.PlayerState.PAUSED) {
		clearInterval(beeper);
	}
}

// function called every 10ms through beeper - moves slider //
function played() {
	position = Math.floor(player.getCurrentTime());
	value = position * lengthofsecond;
	if (start > -1) {
		if (endd <= start) {
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
	if (start < 0) {
		start = Math.floor(player.getCurrentTime());
		$('#startbutton').toggleClass('on');
//		$('#startmin').css('border-color', '#df4301');
//		$('#startsec').css('border-color', '#df4301');
		$('#startmin').val(getMin(start));
		$('#startsec').val(getSec(start));
		$('.ui-slider-horizontal:nth-child(even) .ui-state-default:nth-child(even)').css('background-position', '0% 0%');
	}
}

// called at click on slider with start already set //
function setendd() {
	if (start > -1) {
		if (!endd) {
			$('#endbutton').toggleClass('on');
		}
		player.pauseVideo();
		endd = Math.floor(player.getCurrentTime());
//		$('#enddmin').css('border-color', '#df4301');
//		$('#enddsec').css('border-color', '#df4301');
		$('#endmin').val(getMin(endd));
		$('#endsec').val(getSec(endd));
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
	var url_f = $("#url_f").val();
	loop = $("#loopit").data('loop');
	$("#start").val(start);
	$("#endd").val(endd);

	// start and endd exist //
	if (start > -1 && endd) {
		//POST videoID, start, endd, context	
		var packet = 'start=' + start + '&end=' + endd + '&context=' + context+ '&videoID=' + videoID + '&loop=' + loop + '&customlink=' +customlink + '&url='+url_f ;
			$.post(baseDomainApi, packet, function(data) { 
				console.log(data);
	
				$("#s_url").val(data);
			//	alert(data);
				window.location.href = data;
			});
	} 
	// only start exists //
	else if (start  > -1) {
		//POST videoID, start, context
		var packet = 'start=' + start + '&context=' + context + '&videoID=' + videoID + '&loop=' + loop + '&customlink='+customlink + '&url='+url_f;
		$.post(baseDomainApi, packet, function(data) { 
		//	console.log(data);

			$("#s_url").val(data);
			//alert(data);

			window.location.href = data;

		});

	}
	//nothing exists :P //
	else {
		alert('You should cut the crap first, share later.');
	}
	return false;
}

//preview function
function preview() {
	player.playVideo();
	player.seekTo(start, true);
	previewer = self.setInterval(function() {
		now = Math.floor(player.getCurrentTime());
		if (now >= endd) {
			player.pauseVideo();
			clearInterval(previewer);
		}
	}, 1000);
}

function setLoop() { /* NEW */
	mixpanel.track('looped');
	$('#loopit').toggleClass('on');
	if($('#loopit').data('loop') == '1'){
		$('#loopit').data('loop', '-1');
	}else{
		$('#loopit').data('loop', '1');
	}
	/*
	if (loop) {
		loop = -1;
	}
	else {
		loop = 1;
	}
	*/
}