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
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		
		<link rel="stylesheet" href="/static/css/part.css">

		<script src="/static/js/purl.js"></script>
<?php
    if($this->data->customlink!=''){
        print '<script src="/static/js/hekovnik.js" type="text/javascript"></script>';
    }else{
        print '<script src="/static/js/part.js" type="text/javascript"></script>';
    }
?>

	<!-- start Mixpanel --><script type="text/javascript">(function(c,a){window.mixpanel=a;var b,d,h,e;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.0.min.js';d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d);a._i=[];a.init=function(b,c,f){function d(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?
g=a[f]=[]:f="mixpanel";g.people=g.people||[];h="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.set people.increment".split(" ");for(e=0;e<h.length;e++)d(g,h[e]);a._i.push([b,c,f])};a.__SV=1.1})(document,window.mixpanel||[]);
mixpanel.init("a2eb6f5021e365bcb003c6909948fbab");</script><!-- end Mixpanel -->	
</head>
<body>
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
		<header>
			<div id="logo">
				<a class="logo" href="http://sectio.knedl.si"><img src="/static/img/logo.png" /></a>
			</div>
		</header>
		<div class="container">
			<input type="hidden" value="<?php print $this->data->vid; ?>" id="url_c" />
			<input type="hidden" value="<?php print $this->data->url; ?>" id="url_f" />

			<input type="hidden" value="<?php print $this->data->start; ?>" id="start" />
			<input type="hidden" value="<?php print $this->data->end; ?>" id="end" />
			<input type="hidden" value="<?php print $this->data->loop; ?>" id="loop" />


			<input type="hidden" value="<?php print $this->data->keyword; ?>" id="s_url" />

			<div class="row">
				<div class="span8" id="videocontainer">
					<div id="player">
					</div>
				</div>
				<div class="span4">
					<div id="about">
						<p>
							sect.io is the easiest way to share a part of a video online. use it now and stop wasting other people's time!
						</p>
					</div>
					<div class="bubble">
						<p>
							<?php 
							//var_dump($this->data); 
							print $this->data->context; 
							?>
						</p>
					</div>
					<div id="social">
<a href="https://twitter.com/share" class="twitter-share-button" data-text="" data-count="none">Tweet</a>
<g:plusone annotation="none"></g:plusone>
<div class="fb-like" data-send="true" data-layout="button_count" data-width="120" data-show-faces="false"></div>
					</div>
					<div id="link">
						<div id="copy">
						</div>
						<div id="link">
							<img src="/static/img/ctrlc.png" />
							<input value="http://sectio.knedl.si/<?php print $this->data->keyword; ?>" type="url" name="shortened" id="shortened" /> <!-- CHANGE (odstranjen link div (tut iz CSSa), spremenjen span v input -->
						</div>
					</div>
					<div id="replay">
						<img src="/static/img/replay.png" />
					</div>
					<div id="cutyourown">
						<a href="/"><img src="/static/img/button_cutyourown.png" /></a>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script>
Modernizr.load(
[ '//platform.twitter.com/widgets.js'
, '//apis.google.com/js/plusone.js'
, { test: document.getElementById('facebook-jssdk')
  , nope: '//connect.facebook.net/en_US/all.js#xfbml=1'
  }
]);
		var _gaq=[['_setAccount','UA-32428764-1'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>
</html>