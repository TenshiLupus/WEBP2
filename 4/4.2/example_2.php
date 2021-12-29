<?php
    header("content-type: text/html");

    echo nl2br($_COOKIE["session"] . "\n");
    foreach($_GET as $item => $itemValue){
        echo nl2br("$item= $itemValue" . "\n");
    }

    


?>