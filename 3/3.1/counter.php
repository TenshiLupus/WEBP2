<?php
header('content-type: text/html');

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
    if (flock($fileStream, LOCK_EX)) {
        fwrite($fileStream, $currentValue);
        flock($fileStream, LOCK_UN);
    } else {
        echo "error locking file";
    }   
    fclose($fileStream);
}

$html = file_get_contents("counter.html");
$html = str_replace('---$hits---', $currentValue, $html);

echo $html;
