<?php
    header("Content-type: text/html");


    $randomId = rand(1,100000);
    $mainPage = file_get_contents("bakelink.html");
    $pageToDisplay = str_replace("---session-id---", $randomId, $mainPage);
    echo $pageToDisplay;
    

?>