<?php
    header("Content-type: text/plain");
    foreach($_SERVER as $item=>$itemValue){
        echo ("$item: $itemValue \n");
    }

?>