<?php
require_once( dirname(__FILE__).'/includes/load-yourls.php' );
$scheme = ( isset($_SERVER["HTTPS"]) ? 'https' : 'http' );
$request = str_replace( YOURLS_SITE.'/', '', 'http' . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );

if(isset($_POST['context'])){
	include('api/index.php');
	exit();
}




if(($request=="") | ($request=="/")){
	include('includes/template.class.php');
	$tpl = new template();
	//$tpl->assign('fotogalerija_kategorije', $fotogalerija_kategorije);
	$tpl->display('tmpl/index.php');
	exit();
}

if(($request=="http://sectio.knedl.si/cutit") | ($request=="/cutit") | (request=="/cutit/")){

	include('includes/template.class.php');
	$tpl = new template();
//var_dump($_POST);
if (($_GET['a'] == 'test')) {
	var_dump($_POST);
}
	$tpl->assign('data', $_POST);
	$tpl->display('tmpl/video.php');
	exit();
}

$part = explode('/', $request);
switch($part[0]){


case 'h':
	$pattern = yourls_make_regexp_pattern( yourls_get_shorturl_charset() );
		yourls_do_action( 'pre_load_template', $part[1] );

	//die($request);
	// Redirection:
	if( preg_match( "@^([$pattern]+)/?$@", $part[1], $matches ) ) {
		$keyword   = isset( $matches[1] ) ? $matches[1] : '';
		$keyword = yourls_sanitize_keyword( $keyword );
		yourls_do_action( 'load_template_go', $keyword );
		include( YOURLS_ABSPATH.'/yourls-go.php' );

		exit;
	}else{
			yourls_do_action( 'redirect_keyword_not_found', $keyword );
			yourls_redirect( YOURLS_SITE.'/404/', 404 ); // no 404 to tell browser this might change, and also to not pollute logs
	}
break;


case 'user':
break;

case 'list':
break;

/*case '':
break;
*/
default:

	$pattern = yourls_make_regexp_pattern( yourls_get_shorturl_charset() );
	yourls_do_action( 'pre_load_template', $request );

// Redirection:
if( preg_match( "@^([$pattern]+)/?$@", $request, $matches ) ) {
	$keyword   = isset( $matches[1] ) ? $matches[1] : '';
	$keyword = yourls_sanitize_keyword( $keyword );
	yourls_do_action( 'load_template_go', $keyword );
	include( YOURLS_ABSPATH.'/yourls-go.php' );

	exit;
}else{
		yourls_do_action( 'redirect_keyword_not_found', $keyword );
		yourls_redirect( YOURLS_SITE.'/404/', 404 ); // no 404 to tell browser this might change, and also to not pollute logs
}
/*
// Stats:
if( preg_match( "@^([$pattern]+)\+(all)?/?$@", $request, $matches ) ) {
	$keyword   = isset( $matches[1] ) ? $matches[1] : '';
	$keyword = yourls_sanitize_keyword( $keyword );
	$aggregate = isset( $matches[2] ) ? (bool)$matches[2] && yourls_allow_duplicate_longurls() : false;
	yourls_do_action( 'load_template_infos', $keyword );
	include( YOURLS_ABSPATH.'/yourls-infos.php' );
	exit;
}

// Prefix-n-Shorten sends to bookmarklet (doesn't work on Windows)
if( preg_match( "@^[a-zA-Z]+://.+@", $request, $matches ) ) {
	$url = yourls_sanitize_url( $matches[0] );
	yourls_do_action( 'load_template_redirect_admin', $url );
	yourls_redirect( yourls_admin_url('index.php').'?u='.rawurlencode( $url ), 302 );
	exit;
}

// Past this point this is a request the loader could not understand
yourls_do_action( 'loader_failed', $request );
yourls_redirect( YOURLS_SITE, 302 );
*/
exit;	
break;
}



?>
<?php
die();





// Start YOURLS
require_once( dirname(__FILE__).'/includes/load-yourls.php' );

// Get request in YOURLS base (eg in 'http://site.com/yourls/abcd' get 'abdc')
$scheme = ( isset($_SERVER["HTTPS"]) ? 'https' : 'http' );
$request = str_replace( YOURLS_SITE.'/', '', $scheme . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );

/**
 * TODO: think about doing something with $_SERVER['QUERY_STRING']?
 * Like sho.rt/keyword?something
 * if so:
 *     - deal with logout requests early
 *     - handle differently short urls (sho.rt/keyword?something) and prefix-n-shorten (sho.rt/http://bleh/?s=1)
 */

// Make valid regexp pattern from authorized charset in keywords
$pattern = yourls_make_regexp_pattern( yourls_get_shorturl_charset() );

// Now load required template and exit

yourls_do_action( 'pre_load_template', $request );

// At this point, $request is not sanitized. Sanitize in loaded template.

//die($request);


// Redirection:
if( preg_match( "@^([$pattern]+)/?$@", $request, $matches ) ) {
	$keyword   = isset( $matches[1] ) ? $matches[1] : '';
	$keyword = yourls_sanitize_keyword( $keyword );
	yourls_do_action( 'load_template_go', $keyword );
	include( YOURLS_ABSPATH.'/yourls-go.php' );

	exit;
}

// Stats:
if( preg_match( "@^([$pattern]+)\+(all)?/?$@", $request, $matches ) ) {
	$keyword   = isset( $matches[1] ) ? $matches[1] : '';
	$keyword = yourls_sanitize_keyword( $keyword );
	$aggregate = isset( $matches[2] ) ? (bool)$matches[2] && yourls_allow_duplicate_longurls() : false;
	yourls_do_action( 'load_template_infos', $keyword );
	include( YOURLS_ABSPATH.'/yourls-infos.php' );
	exit;
}

// Prefix-n-Shorten sends to bookmarklet (doesn't work on Windows)
if( preg_match( "@^[a-zA-Z]+://.+@", $request, $matches ) ) {
	$url = yourls_sanitize_url( $matches[0] );
	yourls_do_action( 'load_template_redirect_admin', $url );
	yourls_redirect( yourls_admin_url('index.php').'?u='.rawurlencode( $url ), 302 );
	exit;
}

// Past this point this is a request the loader could not understand
yourls_do_action( 'loader_failed', $request );
yourls_redirect( YOURLS_SITE, 302 );
exit;