<?php

require_once('config.php');
require_once('includes/utility_function.php');
require_once('includes/AuthorTeam.php');

$authors_text = $_GET['authors_text'];

$authorTeam = new AuthorTeam($authors_text, false);
$authorTeam->htmlAuthors = $authorTeam->getHtmlAuthors(); 

header('Content-Type: application/json');
echo json_encode($authorTeam);
