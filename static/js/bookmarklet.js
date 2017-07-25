var ss = document.createElement('script');
ss.src = 'http://sectio.knedl.si/static/js/purl.js';
ss.onload = function() {

	// the minimum version of jQuery we want
	var v = "1.3.2";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
	var done = false;
	var script = document.createElement("script");
	script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
	script.onload = script.onreadystatechange = function(){
		if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
			done = true;
			initMyBookmarklet();
		}
	};
	document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
};
(document.head||document.documentElement).appendChild(ss);

function initMyBookmarklet() {
	$('body').append('<form action="http://sect.io/cutit" id="cutitt" method="post"><input type="hidden" value="" name="url_c" id="url_c" /><input type="hidden" value="" name="url_f" id="url_f" /><input type="hidden" value="" name="start" id="start" /><input type="hidden" value="" name="end" id="end" /><input type="hidden" value="" name="s_url" id="s_url" /></form>');
	console.log('ping');
	a = purl(window.location.href);
	var uurl = a.data.attr.host;
	if ( (uurl == 'www.youtube.com') | (uurl == 'youtube.com') ) {
		if (a.data.param.query.v != '') {
			$("#url_c").val(a.data.param.query.v);
			//url_c = a.data.param.query.v;
		}
		else {
			return false;
		}
	}
	else if( (uurl == 'www.youtu.be') | (uurl == 'youtu.be') ){
		//url_c = a.data.seg.path[0];
		$("#url_c").val(e.data.seg.path[0]);
	}
	if (uurl.indexOf('youtu') > -1) {
		$('#cutitt').submit();
	}
}