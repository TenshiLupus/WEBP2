<?php
header("Content-type: text/html");
$htmlTemplate = file_get_contents("variableSeparation.html");
$pageSections = explode("<!--===xxx===-->", $htmlTemplate);

$temp = $pageSections[1];

echo $pageSections[0];
foreach($_SERVER as $item=>$itemValue){
    $modifiedSection = str_replace("---name---", $item, $pageSections[1]);
    $modifiedSection = str_Replace("---value---", $itemValue, $modifiedSection);
    echo $modifiedSection;
}

echo $pageSections[2];

?>