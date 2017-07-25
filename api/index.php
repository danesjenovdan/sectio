<?php
header('Access-Control-Allow-Origin: *');
define('YOURLS_API', true);
require_once( dirname(__FILE__).'/includes/load-yourls.php' );

//yourls_maybe_require_auth();

$_REQUEST['signature'] = '114f8be2df';
$action = ( isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : null );

yourls_do_action( 'api', $action );

//if(!$_REQUEST['url']){die();}

$url = ( isset( $_REQUEST['url'] ) ? $_REQUEST['url'] : '' );
$start = ( isset( $_REQUEST['start'] ) ? $_REQUEST['start'] : '' );
$end = ( isset( $_REQUEST['end'] ) ? $_REQUEST['end'] : '' );
if($end==''){$end=-1;}
$context = ( isset( $_REQUEST['context'] ) ? $_REQUEST['context'] : '' );
$shares = ( isset( $_REQUEST['shares'] ) ? $_REQUEST['shares'] : '' );
$tags = ( isset( $_REQUEST['tags'] ) ? $_REQUEST['tags'] : '' );
$geo = ( isset( $_REQUEST['geo'] ) ? $_REQUEST['geo'] : '' );
$loop = ( isset( $_REQUEST['loop'] ) ? $_REQUEST['loop'] : 0 );


if (isset($_SERVER['HTTP_REFERER'])) {
    $parts = parse_url($_SERVER['HTTP_REFERER']);
	if ($parts['host'] != REFERER_CHECK) {
		$referer = $parts['host'];
	}
}
if (isset( $_REQUEST['referer'])) {
	$referer = 	$_REQUEST['referer'];
}
//$referer = ( isset( $_REQUEST['referer'] ) ? $_REQUEST['referer'] : '' );
$customlink = ( isset( $_REQUEST['customlink'] ) ? $_REQUEST['customlink'] : '' );
//die();
//$return = yourls_add_new_link( $url, '', '', $start, $end, $context, $shares, $tags, $geo );
$return = yourls_add_new_link( $url, '', '', $start, $end, $context, $shares, $tags, $geo, $loop, $referer, $customlink );
unset( $return['html'] );
print  $return['shorturl'];
die();


/*
header('Access-Control-Allow-Origin: *');
define('YOURLS_API', true);
require_once( dirname(__FILE__).'/includes/load-yourls.php' );
yourls_maybe_require_auth();

$action = ( isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : null );

yourls_do_action( 'api', $action );
	
switch( $action ) {

	case 'vidmo':
		$url = ( isset( $_REQUEST['url'] ) ? $_REQUEST['url'] : '' );
		$keyword = ( isset( $_REQUEST['keyword'] ) ? $_REQUEST['keyword'] : '' );
		$title = ( isset( $_REQUEST['title'] ) ? $_REQUEST['title'] : '' );

		$start = ( isset( $_REQUEST['start'] ) ? $_REQUEST['start'] : '' );
		$end = ( isset( $_REQUEST['end'] ) ? $_REQUEST['end'] : '' );
		$context = ( isset( $_REQUEST['context'] ) ? $_REQUEST['context'] : '' );
		$shares = ( isset( $_REQUEST['shares'] ) ? $_REQUEST['shares'] : '' );


		$return = yourls_add_new_link( $url, $keyword, $title, $start, $end, $context, $shares );
		$return['simple'] = ( isset( $return['shorturl'] ) ? $return['shorturl'] : '' ); // This one will be used in case output mode is 'simple'

	

		unset( $return['html'] ); // in API mode, no need for our internal HTML output
//$format = ( isset( $_REQUEST['format'] ) ? $_REQUEST['format'] : 'xml' );
//yourls_api_output( $format, $return );
//var_dump($return);
print  $return['shorturl'];
die();
		break;

	// Shorten a URL
	case 'shorturl':
		$url = ( isset( $_REQUEST['url'] ) ? $_REQUEST['url'] : '' );
		$keyword = ( isset( $_REQUEST['keyword'] ) ? $_REQUEST['keyword'] : '' );
		$title = ( isset( $_REQUEST['title'] ) ? $_REQUEST['title'] : '' );
		$return = yourls_add_new_link( $url, $keyword, $title, $start, $end, $context, $shares );
		$return['simple'] = ( isset( $return['shorturl'] ) ? $return['shorturl'] : '' ); // This one will be used in case output mode is 'simple'
		unset( $return['html'] ); // in API mode, no need for our internal HTML output
		break;
	
	// Global stats
	case 'stats':
		$filter = ( isset( $_REQUEST['filter'] ) ? $_REQUEST['filter'] : '' );
		$limit = ( isset( $_REQUEST['limit'] ) ? $_REQUEST['limit'] : '' );
		$return = yourls_api_stats( $filter, $limit );
		break;
	
	// Stats for a shorturl
	case 'url-stats':
		$shorturl = ( isset( $_REQUEST['shorturl'] ) ? $_REQUEST['shorturl'] : '' );
		$return = yourls_api_url_stats( $shorturl );
		break;

	// Expand a short link
	case 'expand':
		$shorturl = ( isset( $_REQUEST['shorturl'] ) ? $_REQUEST['shorturl'] : '' );
		$return = yourls_api_expand( $shorturl );
		break;
	
	// Missing or incorrect action parameter
	default:
		$return = array(
			'errorCode' => 400,
			'message'   => 'Unknown or missing "action" parameter',
			'simple'    => 'Unknown or missing "action" parameter',
		);
		

}

$format = ( isset( $_REQUEST['format'] ) ? $_REQUEST['format'] : 'xml' );

yourls_api_output( $format, $return );

die();

*/

/*



	$.ajax({
		url: 'http://v.n9.si/',
		type: 'POST',
		crossDomain:true,
		data: {
			url: url, 
			start: 10,
			//end: 250,
			context: "twitter",
			shares: "twitter, facebook",
			tags: $("#form").serialize(),
			geo: "ljubljana",

		},
		success: function (res) {
		var a = '<a href="'+res+'">'+res+'</a>';
			base.parent().append(a);
			$("#Div1").html(a);
		}
	});


//$.post('http://v.n9.si/yourls-api.php', 'url=http://www.youtube.com/watch?v=-WiwNekNJGA&start=10&end=50', function (data) {  });

*/