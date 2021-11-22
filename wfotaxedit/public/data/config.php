<?php

session_start();

require_once('../wfo_edit_secrets.php'); // outside the github root

// ORCID Connection details
// client id and secret are loaded in the secret file
// define('ORCID_CLIENT_ID', "XXXXXXXXXXX");
// define('ORCID_CLIENT_SECRET', 'XXXXXXXXXXXXX');
define('ORCID_TOKEN_URI', 'https://orcid.org/oauth/token');

// the redirect uri depends on live or not
if(getenv('WFO_EDIT_DEV')){
  define('ORCID_REDIRECT_URI', 'http://localhost:3000/orcid_redirect.html');
}else{
  define('ORCID_REDIRECT_URI', 'https://list.worldfloraonline.org/edit/orcid_redirect.html');
}

// the login uri is constructed from variables above
define('ORCID_LOGIN_URI', 'https://orcid.org/oauth/authorize?client_id='. ORCID_CLIENT_ID .'&response_type=code&scope=/authenticate&redirect_uri=' . ORCID_REDIRECT_URI);


// create and initialize the database connection - defined in ../wfo_secrets.php
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_database);

// connect to the database
if ($mysqli->connect_error) {
  echo $mysqli->connect_error;
}

if (!$mysqli->set_charset("utf8")) {
  echo printf("Error loading character set utf8: %s\n", $mysqli->error);
}

// used all over to generate guids
function get_uri($taxon_id){
    return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/" . $taxon_id;
}