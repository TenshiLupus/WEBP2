<?php

try{
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=comments', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$page = file_get_contents('databaseTransaction.html');
$pageSections = explode("<!--===entries===-->", $page);


//stating the beginning of the transaction


//state query that will be executed
$dateId = $_GET['datet'];

$statement = $pdo->prepare("SELECT * FROM images WHERE images.Datet='$dateId'");
$statement->execute();
$row = $statement->fetch(PDO::FETCH_ASSOC);

$mimeType = $row["MimeType"];
$imageData = $row["Picture"];
header("Content-type: $mimeType");
echo $imageData;
}
catch(PDOException $e){
    echo "ERROR: " . $e->getMessage();
}
$pdo = null;
?>
