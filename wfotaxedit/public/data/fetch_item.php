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
$ancestor = $item;

while($ancestor = get_parent_item($ancestor)){
    $ancestors[] = $ancestor;
};

// we want the ancestors the other way around to we walk towards the current taxon
$item['ancestors'] = array_reverse($ancestors);

// get the children
$item['children'] = get_children($item);

// and the synonyms
$item['synonyms'] = get_synonyms($item);


// we can edit everything below an assigned taxon
if($_SESSION['user_id']){
    $assignments = get_assignments($_SESSION['user_id']);
}else{
    $assignments = array();
}

// simplify the array
$asses = array();
foreach($assignments as $ass){
    $asses[] = $ass['wfo_id'];
}

// work down from the top of the tree
// if we find one we can edit we can edit everything onwards
$can_edit = false;
for ($i=0; $i < count($item['ancestors']); $i++) { 
    if( in_array($item['ancestors'][$i]['wfo_id'], $asses) ) $can_edit = true;
    $item['ancestors'][$i]['can_edit'] = $can_edit;
}

// item is the last ancestor so has same rights
$item['can_edit'] = $can_edit;

// Children have the same edit rights as last one in lineage.
for ($i=0; $i < count($item['children']); $i++) { 
    
    $item['children'][$i]['can_edit'] = $can_edit;

    // unless they are assigned
    if( in_array($item['children'][$i]['wfo_id'], $asses) ){
        $item['children'][$i]['can_edit'] = true;
    } 
}

// Synonyms have the same edit rights as last one in lineage.
for ($i=0; $i < count($item['synonyms']); $i++) { 
    
    $item['synonyms'][$i]['can_edit'] = $can_edit;

    // unless they are assigned
    if( in_array($item['synonyms'][$i]['wfo_id'], $asses) ){
        $item['synonyms'][$i]['can_edit'] = true;
    } 
}

// add the basionym
if($item['basionym_wfo_id']){
    $item['basionym'] = get_item($item['basionym_wfo_id']);
}

header('Content-Type: application/json');
echo json_encode($item);




