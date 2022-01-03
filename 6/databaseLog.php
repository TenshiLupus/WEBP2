<?php
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=logs','root','');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



$time = $_SERVER["REQUEST_TIME"];
$address = $_SERVER["REMOTE_ADDR"];
$client = $_SERVER["HTTP_USER_AGENT"];

$currentDate = date('Y-m-d H:i:s');

$query = $pdo->prepare("INSERT INTO users (Datetd, Clientaddr, Client) VALUES (:datetd, :clientAddr, :client)");
$query->bindValue(':datetd', $currentDate);
$query->bindValue(':clientaddr', $address);
$query->bindValue(':client', $client);


$query->execute();
// $statement = $pdo->prepare('SELECT * FROM Users ORDER BY Tid DESC');
// $statement->execute();
// $logs = $statement->fetchAll(PDO::FETCH_ASSOC);

$pdo = null;
echo '<pre>';
echo '<pre>';
