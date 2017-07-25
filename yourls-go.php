<?php
define('YOURLS_GO', true);
//require_once( dirname(__FILE__).'/includes/load-yourls.php' );

// Variables should be defined in yourls-loader.php, if not try GET request (old behavior of yourls-go.php)
if( !isset( $keyword ) && isset( $_GET['id'] ) )
	$keyword = $_GET['id'];
$keyword = yourls_sanitize_string( $keyword );

// First possible exit:
if ( !$keyword ) {
	yourls_do_action( 'redirect_no_keyword' );
	yourls_redirect( YOURLS_SITE, 301 );
}

// Get URL From Database
//$url = yourls_get_keyword_longurl( $keyword );
$url = yourls_get_vidmo_url( $keyword );


// URL found
if( !empty($url) ) {




	// Update click count in main table
	$update_clicks = yourls_update_clicks( $keyword );
	// Update detailed log for stats
	$log_redirect = yourls_log_redirect( $keyword );
	
include('includes/template.class.php');
$tpl = new template();
$tpl->assign('data', $url);
$tpl->display('tmpl/part.php');
exit();
//	yourls_do_action( 'redirect_shorturl', $url, $keyword );
//	yourls_redirect( $url, 301 );


//die(var_dump($url));


// URL not found. Either reserved, or page, or doesn't exist
} else {

	// Do we have a page?
	if ( file_exists(YOURLS_PAGEDIR."/$keyword.php") ) {
		// Include YOURLS functions we've skipped, they might be of use
		require_once( YOURLS_INC.'/functions-html.php' );
		yourls_page($keyword);

	// Either reserved id, or no such id
	} else {
		yourls_do_action( 'redirect_keyword_not_found', $keyword );
		
		yourls_redirect( YOURLS_SITE, 302 ); // no 404 to tell browser this might change, and also to not pollute logs
	}
}
exit();
