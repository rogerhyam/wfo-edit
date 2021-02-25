<?php

require_once('config.php');
require_once('includes/utility_function.php');

$user = array();

// check in the session to see if they have a valid one. 
// if the session is hunky dory send that back as OK.
// things are put in the session by the orcid_callback.php script
$valid_session = false;
if(isset($_SESSION['user_id']) && isset($_SESSION['user_name'])){
    $result = $mysqli->query("SELECT * FROM users where id = " . $_SESSION['user_id'] );
    if($result->num_rows){
        $valid_session = true;
    }
}

if($valid_session){
    $user['logged_in'] = true;
    $user['user_id'] = $_SESSION['user_id'];
    $user['user_name'] = $_SESSION['user_name'];
    $user['orcid'] = $_SESSION['orcid'];

    // lets get their assignments too.
    $user['assignments'] = get_assignments($_SESSION['user_id']);


}else{
    $user['logged_in'] = false;
    $user['message'] = "User not logged in.";
}

// just to signal php is ok
$user['php_session'] = session_id();
$user['orcid_login_uri'] = ORCID_LOGIN_URI;

header('Content-Type: application/json');
echo json_encode($user);