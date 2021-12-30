<?php
    session_start();
    header("file-content: text/html");

    $mainPage = file_get_contents("sessionLink.html");
 
    $pageToDisplay = str_replace("---session-id---",$_COOKIE["PHPSESSID"], $mainPage);

    echo $pageToDisplay;

?>
