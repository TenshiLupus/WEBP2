<?php
    header("content-type: text/html");

    foreach($_GET as $item => $itemValue){
        echo nl2br("$item = $itemValue \n");
    }
    echo "session-id = " . $_COOKIE["PHPSESSID"];

    
?>