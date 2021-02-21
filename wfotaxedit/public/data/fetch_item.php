<?php

require_once('config.php');
require_once('includes/utility_function.php');

$wfo_id = $_GET['wfo_id'];
sanity_check_wfo_id($wfo_id);

// the main business
$item = get_item($wfo_id);

// get the ancestors
$ancestors = array();
$ancestor = get_item($wfo_id);
$ancestors[] = $item;
$ancestor = $item;

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




