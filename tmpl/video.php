<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>sect.io</title>
		<meta name="description" content="sect.io">
		<meta name="author" content="sect.io team">

		<meta name="viewport" content="width=device-width">

		<link rel="shortcut icon" href="favicon.png" />
		<link rel="stylesheet" href="/static/css/bootstrap.css">
		<link rel="stylesheet" href="/static/css/bootstrap-responsive.min.css">

		<script src="/static/js/libs/modernizr-2.5.3-respond-1.1.0.min.js" type="text/javascript"></script>
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
		
		<link rel="stylesheet" href="/static/css/video.css">
		
		<!-- start Mixpanel --><script type="text/javascript">(function(c,a){window.mixpanel=a;var b,d,h,e;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.0.min.js';d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d);a._i=[];a.init=function(b,c,f){function d(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?
g=a[f]=[]:f="mixpanel";g.people=g.people||[];h="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.set people.increment".split(" ");for(e=0;e<h.length;e++)d(g,h[e]);a._i.push([b,c,f])};a.__SV=1.1})(document,window.mixpanel||[]);
mixpanel.init("a2eb6f5021e365bcb003c6909948fbab");</script><!-- end Mixpanel -->
</head>
<body>
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
		<header>
			<div id="logo">
				<a href="http://sectio.knedl.si"><img src="/static/img/logo.png" /></a>
			</div>
		</header>
		<div class="container">
			data
			<?php print_r($this->data); ?>
			<input type="hidden" value="<?php print $this->data["url_c"]; ?>" id="url_c" />
			<input type="hidden" value="<?php print $this->data["url_f"]; ?>" id="url_f" />

			<input type="hidden" value="<?php print $this->data["start"]; ?>" id="start" />
			<input type="hidden" value="<?php print $this->data["end"]; ?>" id="end" />

			<input type="hidden" value="<?php print $this->data["s_url"]; ?>" id="s_url" />

			<div class="row">
				<div class="span8" id="videocontainer">
					<div id="player">
					</div>
					<div id="slider">
					</div>
				</div>
				<div class="span4">
					<div id="controls">
						<div id="startline">
							<div id="startbutton">
							</div>
							<input type="number" id="startmin" name="startmin" class="timeinput" />
							<label for="startmin">m</label>
							<input type="number" id="startsec" name="startsec" class="timeinput" />
							<label for="startmin">s</label>
						</div>
						<div id="endline">
							<div id="endbutton">
							</div>
							<input type="number" id="endmin" name="endtmin" class="timeinput" />
							<label for="endmin">m</label>
							<input type="number" id="endsec" name="endsec" class="timeinput" />
							<label for="endmin">s</label>
						</div>
						<div id="loopit" data-loop="-1"></div>
						<div id="yoursay">
							<img src="/static/img/haveyoursay.png" id="haveyoursay" />
							<textarea id="context"></textarea>
							<img src="/static/img/button_cutit.png" id="cutit" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>

<script type="text/javascript">
var baseDomain = 'http://sectio.knedl.si/';
var baseDomainApi = 'http://sectio.knedl.si/api/';
var customlink = '';
</script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
		<script src="/static/js/player.js" type="text/javascript"></script>
		<script src="/static/js/videobuttons.js" type="text/javascript"></script>

	<script>
		var _gaq=[['_setAccount','UA-32428764-1'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>
</html>
