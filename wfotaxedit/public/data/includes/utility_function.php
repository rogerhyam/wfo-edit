<?php

function get_item($wfo_id){
    
    global $mysqli;
    
    $response = $mysqli->query("SELECT * from items WHERE wfo_id = '$wfo_id'");
    if($response->num_rows == 1){
        return $response->fetch_assoc();
    }else{
        return null;
    }

}

function get_parent_item($item){
    if($item && $item['parent_wfo_id']){
        return get_item($item['parent_wfo_id']);
    }else{
        return null;
    }
}

function get_children($item){
    global $mysqli;
    
    $kids = array();

    $response = $mysqli->query("SELECT * from items WHERE parent_wfo_id = '{$item['wfo_id']}' and `status` != 'synonym' order by name");
    while($kid = $response->fetch_assoc()){
        $kids[] = $kid;
    }
    return $kids;
}

function get_synonyms($item){
    global $mysqli;
    
    $syns = array();

    $response = $mysqli->query("SELECT * from items WHERE parent_wfo_id = '{$item['wfo_id']}' and `status` = 'synonym' order by name");
    while($syn = $response->fetch_assoc()){
        $syns[] = $syn;
    }
    return $syns;
}


function sanity_check_wfo_id($wfo_id){
    if(!preg_match('/^wfo-[0-9]{10}$/', $wfo_id)){
        http_response_code(406);
        echo "Badly formatted WFO ID: $wfo_id";
        exit;
    }
}

function get_assignments($user_id){

    global $mysqli;

    $assignments = array();
    $result = $mysqli->query("SELECT * FROM assignments as a join items as i on a.wfo_id = i.wfo_id where a.user_id = " . $user_id);
    while($row = $result->fetch_assoc()){
        $assignments[] = $row;
    }
    return $assignments;

}