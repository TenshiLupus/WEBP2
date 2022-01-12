<?php
    $sessionID = rand(1,100000);
    setcookie("session", $sessionID,time() + 60 * 60 * 3,"","",true);
?>

<?php
    header("Content-type: text/html");
    
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'){
    $cookieValue = $_COOKIE["session"];
    
    $mainPage = file_get_contents("cookieLink.html");

    $pageToDisplay = str_replace("---session-id-secure---", $cookieValue, $mainPage);
    
    
    if(isset($_COOKIE["session"])){
        echo "session id is set";
    }else{
        echo "cookie not set";
    }

    echo $pageToDisplay;
    }
    else{
        echo "you are not using a secure connection please use HTTPS";
    }

?>