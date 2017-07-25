<?php
header ('Content-type: text/html; charset=utf-8');
error_reporting(1);
ini_set('display_errors',1);
ini_set('log_errors', 'On');
ini_set("error_log", "/domains/sect.io/public_html/php-error.log");

include('api/includes/cnfdb.php');
