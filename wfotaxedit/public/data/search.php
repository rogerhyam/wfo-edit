<?php

require_once('config.php');
require_once('includes/utility_function.php');

$terms = trim(@$_GET['terms']);

$results = array();

if(preg_match('/^wfo-[0-9]{10}$/', $terms)){

    $response = $mysqli->query("SELECT * FROM items WHERE wfo_id = '$terms'");       
    while($row = $response->fetch_assoc()){
        $results[] = $row;
    }

}else{

    $statuses = @$_GET['status'];
    if($statuses){
        $parts = explode(',', $statuses);
        $statuses = "status in ('" . implode("','", $parts) . "') AND ";
    }

    $sql = "SELECT * FROM items WHERE $statuses MATCH (`full_name`) AGAINST ('$terms' IN BOOLEAN MODE) limit 100";

    $response = $mysqli->query($sql);
    while($row = $response->fetch_assoc()){
        $results[] = $row;
    }

}


header('Content-Type: application/json');
echo json_encode($results);



