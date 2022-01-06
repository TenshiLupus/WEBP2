<?php
header("content-type: text/html");

$pdo = new PDO('mysql:host=localhost;port=3306;dbname=comments','root','');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$page = file_get_contents('databaseSecurity.html');
$pageSections = explode("<!--===entries===-->",$page);


$userName = $_POST['name'];
$userEmail = $_POST['email'];
$userHomepage = $_POST['homepage'];
$userComment = $_POST['comment'];

$currentDate = date('Y-m-d H:i:s');

$tableQuery = 'users';

$query = $pdo->prepare("INSERT INTO :users (Namn, Epostaddress, Hemsida, Kommentar, Datet)
                         VALUES (:namn, :epostaddress, :hemsida, :kommentar, :datet)");

$query->bindValue(':datet', $currentDate, PDO::PARAM_STR);
$query->bindValue(':namn', $userName, PDO::PARAM_STR);
$query->bindValue(':epostaddress', $userEmail, PDO::PARAM_STR);
$query->bindValue(':hemsida', $userHomepage, PDO::PARAM_STR) ;
$query->bindValue(':kommentar', $userComment, PDO::PARAM_STR);
$query->bindValue(':users', $tableQuery, PDO::PARAM_STR);

$query->
$query->execute();

$statement = $pdo->prepare('SELECT * FROM Users ORDER BY Datet ASC');
$statement->execute();
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);


echo $pageSections[0];


foreach($rows as $rowNumber => $user){

$users = str_replace("---no---", $rowNumber + 1, $pageSections[1]);
$users = str_replace("---time---", $user["Datet"], $users);
$users = str_replace("---name---", $user["Namn"], $users);
$users = str_replace("---email---", $user["Epostaddress"], $users);
$users = str_replace("---homepage---", $user["Hemsida"], $users);
$users = str_replace("---comment---",$user["Kommentar"], $users);

echo $users;
}

echo $pageSections[2];
$pdo = null;
