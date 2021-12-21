<?php
header('content-type: text/plain');
function hit_count()
{
    session_start();
    $counterTextFile = 'count.txt';

    if (!file_exists($counterTextFile)) {
        $f = fopen($counterTextFile, "w");
        fwrite($f, "0");
        fclose($f);
    }


    $fileStream = fopen($counterTextFile, 'r');
    $currentValue = fread($fileStream, filesize($counterTextFile));
    fclose($fileStream);

    if (!isset($_SESSION['hasVisited'])) {
        $_SESSION['hasvisited'] = 'yes';
        $currentValue++;
        $fileStream = fopen($counterTextFile, "w");
        if (flock($fileStream, LOCK_EX)){
            fwrite($fileStream, $currentValue);
            flock($fileStream, LOCK_UN);
        }else{
            echo "error locking file";
        }
        fclose($fileStream);
    }

    echo "site has been visited $currentValue times.";
}
