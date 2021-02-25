<?php

require_once('config.php');
require_once('includes/utility_function.php');

$itemData = file_get_contents("php://input");
$itemData = JSON_decode($itemData);

$response = array();

$sql = "UPDATE items SET 
    `wfo_id` = ?,
    `rank` = ?,
    `name` = ?, 
    `genus` = ?, 
    `species` = ?, 
    `author_text` = ?, 
    `protologue_text` = ?,
    `basionym_wfo_id` = ?, 
    `parent_wfo_id` = ?,
    `status` = ?,
    `comments` = ?
    WHERE
    `id` = ?;   ";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param(
    "sssssssssssi",
    $itemData->wfo_id,
    $itemData->rank,
    $itemData->name,
    $itemData->genus,
    $itemData->species, 
    $itemData->author_text,
    $itemData->protologue_text,
    $itemData->basionym_wfo_id, 
    $itemData->parent_wfo_id, 
    $itemData->status,
    $itemData->comments,
    $itemData->id
);
$stmt->execute();

if($mysqli->error){
    error_log($mysqli->error);
    $response['error'] = $mysqli->error;
}else{
    $response['success'] = $itemData->id;
}

header('Content-Type: application/json');
echo json_encode($response);