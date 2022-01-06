<?php
header("content-type: text/html");

$pdo = new PDO('mysql:host=localhost;port=3306;dbname=logs','root','');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$time = $_SERVER["REQUEST_TIME"];
$address = $_SERVER["REMOTE_ADDR"];
$client = $_SERVER["HTTP_USER_AGENT"];

$currentDate = date('Y-m-d H:i:s');

$query = $pdo->prepare("INSERT INTO users (Datetd, Clientaddr, Client) VALUES (:datetd, :clientAddr, :client)");
$query->bindValue(':datetd', $currentDate);
$query->bindValue(':clientAddr', $address);
$query->bindValue(':client', $client);


$query->execute();
$statement = $pdo->prepare('SELECT * FROM Users ORDER BY Datetd DESC');
$statement->execute();
$logs = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach($logs as $item => $user){
    echo "Tid: " . nl2br($user["Datetd"] . "\n");
    echo "REMOTE_ADDR: " . nl2br($user["Clientaddr"] . "\n");
    echo "REMOTE_USER_AGENT: " . nl2br($user["Client"] . "\n");
    echo nl2br("\n");
}

$pdo = null;

