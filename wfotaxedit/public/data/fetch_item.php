<?php

require_once('config.php');
require_once('includes/utility_function.php');

$wfo_id = $_GET['wfo_id'];
sanity_check_wfo_id($wfo_id);

// the main business
$item = get_item($wfo_id);

// get the ancestors
$ancestors = array();

// I am my own first ancestor
$ancestors[] = $item;

// if I am a synonym then my first parent is the accepted taxon
if($item['accepted_wfo_id']){

    $item['debug'] = "BANANANA";

    // first ancestor becomes our accepted taxon
    $accepted = get_item($item['accepted_wfo_id']);
    $ancestors[] = $accepted;
    $ancestor = $accepted;

}else{   
    $ancestor = $item;
}

while($ancestor = get_parent_item($ancestor)){
    $ancestors[] = $ancestor;
};

$item['ancestors'] = array_reverse($ancestors);

// get the children
$item['children'] = get_children($item);

// and the synonyms
$item['synonyms'] = get_synonyms($item);

header('Content-Type: application/json');
echo json_encode($item);




