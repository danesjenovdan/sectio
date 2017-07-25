/* Author:
	sect.io team
*/

$('#getit').click(function () {
	var url = $("#url").val();
	$("#url_f").val(url);

	var e = purl(url);
	var uurl = e.data.attr.host;
	if ((uurl == 'www.youtube.com') | (uurl == 'youtube.com')) {

		if (e.data.param.query.v != '') {
			$("#url_c").val(e.data.param.query.v);
		} else {
			return false;
		}

	} else if ((uurl == 'www.youtu.be') | (uurl == 'youtu.be')) {

		$("#url_c").val(e.data.seg.path[0]);

	} else if ((uurl == 'www.vimeo.com') | (uurl == 'vimeo.com')) {

	} else {

	}

	if ($('#url').val().indexOf('youtu') > -1) {
		$("#cutitt").submit();
	}

});

$(document).ready(function () {
	mixpanel.register({
		'landing': 'index'
	});
	mixpanel.track_forms('#cutitt', 'GO');
	$('#url').keypress(function (e) {
		if (e.which == 13) {
			var url = $("#url").val();
			$("#url_f").val(url);

			var e = purl(url);
			var uurl = e.data.attr.host;
			if ((uurl == 'www.youtube.com') | (uurl == 'youtube.com')) {

				if (e.data.param.query.v != '') {
					$("#url_c").val(e.data.param.query.v);
				} else {
					return false;
				}

			} else if ((uurl == 'www.youtu.be') | (uurl == 'youtu.be')) {

				$("#url_c").val(e.data.seg.path[0]);

			} else if ((uurl == 'www.vimeo.com') | (uurl == 'vimeo.com')) {

			} else {

			}

			if ($('#url').val().indexOf('youtu') > -1) {
				$("#cutitt").submit();
			}

		}
	});
});