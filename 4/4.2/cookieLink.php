<?php
    $sessionID = rand(1,100000);
    setcookie("session", $sessionID,time() + 60 * 60 * 3);
?>

<?php
    header("Content-type: text/html");
    
    $cookieValue = $_COOKIE["session"];
  
    $mainPage = file_get_contents("cookieLink.html");

    $pageToDisplay = str_replace("---session-id---", $cookieValue, $mainPage);
    
    
    if(isset($_COOKIE["session"])){
        echo "session id is set";
    }else{
        echo "cookie not set";
    }

    echo $pageToDisplay;


?>