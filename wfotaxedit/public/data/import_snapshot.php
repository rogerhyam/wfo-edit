<?php

require_once('config.php');

// e.g. php import_snapshot.php -f /Users/rogerhyam/Documents/vscode/wfo-norm-solr/seed/2019-05.txt

echo "\nThis will import a new taxonomic backbone file - overwriting existing\n";

if(php_sapi_name() !== 'cli'){
    echo "Command line only!\n";
    exit;
}

$ops = getopt('f:');

// have we got a file
if(isset($ops['f']) && $ops['f']){
    $file_path = $ops['f']; 
}else{
    echo "You must set a path to the classification file with the -f option.\n";
    exit;
}

if(!file_exists($file_path)){
    echo "File doesn't exist: $file_path";
    exit;
}

if(is_dir($file_path)){
    echo "File is directory: $file_path";
    exit;
}

// count the lines
$total_lines = 0;
$fp = fopen($file_path,"r");
if($fp){
    while(!feof($fp)){
      $content = fgets($fp);
      if($content){
        $total_lines++;
      } 
    }
}
fclose($fp);
$total_lines--;
echo "Total lines: " . number_format($total_lines) . "\n";

// open the file
$file = fopen($file_path, "r");

if($file === FALSE){
    echo "Couldn't open file: $file_path\n";
}

// get the column titles
// assume longest line is 2,000 chars (currently longest is 480)
$fields = fgetcsv($file, 2000, "\t");
echo "Total fields: " . number_format(count($fields)) . "\n";

// go for it to work through lines
$line_count = 0;
$solr_docs = array();
$display_length = 0;

while($row = fgetcsv($file, 2000, "\t")){

    // build our little object
    $data = array();

    $data['wfo_id'] = $row[ array_search('taxonID',$fields) ];

    $rank = $row[ array_search('taxonRank',$fields) ];
    $rank = strtolower($rank);

    // rank map - make sure we only accept certain ranks
    $rank_map = array(
        "phylum" => "phylum",
        "order" => "order",
        "family" => "family",
        "section" => "section",
        "genus" => "genus",
        "subgenus" => "subgenus",
        "species" => "species",
        "nothospecies"=> "species",
        "subspecies" => "subspecies",
        "variety" => "variety",
        "subvariety" => "variety",
        "form" => "form",
        "forma" => "form",
        "subform" => "form"
    );

    if(!array_key_exists($rank, $rank_map)) {
        echo "\nUnrecognised rank: $rank\n";
        exit;
    }
    $data['rank'] = $rank_map[$rank];

    // the name depends on the rank
    switch ($data['rank']) {

        // binomials
        case 'species':
            $parts = explode(' ', trim($row[ array_search('scientificName',$fields) ]));
            $data['genus'] = $parts[0];
            $data['name'] = $parts[1];
            $data['species'] = null;
            break;
        
        // trinomials
        case 'subspecies':
        case 'variety':
        case 'form':
            $parts = explode(' ', trim($row[ array_search('scientificName',$fields) ]));
            $data['genus'] = $parts[0];
            $data['species'] = $parts[1];
            $data['name'] = array_pop($parts); // last element avoiding ssp. or var. etc
            break;
        
        // mononomials
        default:
            $data['name'] = trim($row[ array_search('scientificName',$fields) ]);
            $data['genus'] = null;
            $data['species'] = null;
            break;
    }

    $data['author_text'] = trim($row[ array_search('scientificNameAuthorship',$fields) ]);
    $data['protologue_text'] = trim($row[ array_search('namePublishedIn',$fields) ]);
    
    //$data['basionym_wfo_id'] = ???

    $data['ipni_name_id'] = trim($row[ array_search('scientificNameID',$fields) ]);
    $data['legacy_references'] = trim($row[ array_search('references',$fields) ]);

    // parent name 
    $data['parent_wfo_id'] = trim($row[ array_search('parentNameUsageID',$fields) ]);

    // accepted name if synonym
    // FIXME: This has gone
    $data['accepted_wfo_id'] = trim($row[ array_search('acceptedNameUsageID',$fields) ]);

    // status
    $status = trim($row[ array_search('taxonomicStatus',$fields) ]);
    $status = strtolower($status);
    $status_map = array(
        "accepted" => "checked",
        "synonym" => "checked",
        "homotypicsynonym" => "checked",
        "heterotypicsynonym" => "checked",
        "unchecked" => "unchecked",
        "doubtful" => "ambiguous",
        "ambiguous" => "ambiguous",
    );

    if(!array_key_exists($status, $status_map)) {
        echo "\nUnrecognised status: $status\n";
        exit;
    }
    $data['status'] = $status_map[$status];

    $row_id = false;
    $stmt = $mysqli->prepare("SELECT id FROM items WHERE wfo_id = ?");
    $stmt->bind_param("s", $data['wfo_id']);
    $stmt->execute();
    $stmt->bind_result($row_id);
    $stmt->fetch();
    $stmt->close();

    echo "\nROW $row_id\n";
    
    if($row_id){

        // we are in update land
        $sql = "UPDATE items SET
            `rank` = ?,
            `genus` = ?,
            `name` = ?,
            `species` = ?,
            `author_text` = ?,
            `protologue_text` = ?,
            `ipni_name_id` = ?,
            `legacy_references` = ?,
            `parent_wfo_id` = ?,
            `accepted_wfo_id` = ?,
            `status` = ?
            WHERE id = ?
            ";
        echo "\n$sql\n";
        $stmt = $mysqli->prepare($sql);
        echo $mysqli->error;
        $stmt->bind_param(
            "sssssssssssi",
            $data['rank'],
            $data['genus'],
            $data['name'],
            $data['species'],
            $data['author_text'],
            $data['protologue_text'],
            $data['ipni_name_id'],
            $data['legacy_references'],
            $data['parent_wfo_id'],
            $data['accepted_wfo_id'],
            $data['status'],
            $row_id
        );
        $stmt->execute();
        $stmt->close();

    }else{

        // we are in insert land
        $sql = "INSERT INTO items 
            (`wfo_id`, `rank`, `genus`, `name`, `species`, `author_text`, `protologue_text`, `ipni_name_id`, `legacy_references`, `parent_wfo_id`, `accepted_wfo_id`, `status`) 
            VALUES 
            (?,?,?,?,?,?,?,?,?,?,?,?)";
        //echo "\n$sql\n";
        $stmt = $mysqli->prepare($sql);
        echo $mysqli->error;
        $stmt->bind_param(
            "ssssssssssss",
            $data['wfo_id'],
            $data['rank'],
            $data['genus'],
            $data['name'],
            $data['species'],
            $data['author_text'],
            $data['protologue_text'],
            $data['ipni_name_id'],
            $data['legacy_references'],
            $data['parent_wfo_id'],
            $data['accepted_wfo_id'],
            $data['status']
        );
        $stmt->execute();
        $stmt->close();
 
    }

    // got a nice data object that should match the fields in the db.


   print_r($data);

   $line_count++;
   // if($line_count > 15) break;
   //if ($data['rank'] == 'variety') break;

}
