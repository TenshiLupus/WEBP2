<?php
header("content-type: text/plain");
$formMethod;
$methodUsage;
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $formMethod = $_POST;
    $methodUsage = "post";
}
else{
    $formMethod = $_GET;
    $methodUsage = "get";
}
foreach($formMethod as $item => $itemValue){
    echo "$item : $itemValue\n";
}
echo $methodUsage;
?>