<?php
header("content-type: text/plain");

    $firstName = $_GET['name'];
    $lastName = $_GET['lastname'];
    
    foreach($_GET as $item => $itemValue){
        echo "$item = $itemValue\n";
    }
?>