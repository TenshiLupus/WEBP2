<?php
header("content-type: text/html");

$pdo = new PDO('mysql:host=localhost;port=3306;dbname=comments', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$page = file_get_contents('databaseTransaction.html');
$pageSections = explode("<!--===entries===-->", $page);

try {
    //stating the beginning of the transaction
    $pdo->beginTransaction();
    
    echo "selecting"; 
    //state query that will be executed
    $statement = $pdo->prepare('SELECT * FROM Users, images WHERE Users.Datet = images.Datet');
    $statement->execute();
    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
       
    if ($_SERVER["REQUEST_METHOD"] === 'POST') {

        $userName = $_POST['name'];
        $userEmail = $_POST['email'];
        $userHomepage = $_POST['homepage'];
        $userComment = $_POST['comment'];
        $uploadedFile = $_FILES['file'];


        $currentDate = date('Y-m-d H:i:s');

        echo "inserting";

        //prepares query for insertion into users table
        $query = $pdo->prepare("INSERT INTO users (Namn, Epostaddress, Hemsida, Kommentar, Datet) VALUES (:namn, :epostaddress, :hemsida, :kommentar, :datet)");
        //query for images table
        $imageQuery = $pdo->prepare("INSERT INTO images (Picture, MimeType, Datet) VALUES(:picture, :mimetype, :datet)");
        
        //binding values to placeholders.
        $query->bindValue(':datet', $currentDate, PDO::PARAM_STR);
        $query->bindValue(':namn', $userName, PDO::PARAM_STR);
        $query->bindValue(':epostaddress', $userEmail, PDO::PARAM_STR);
        $query->bindValue(':hemsida', $userHomepage, PDO::PARAM_STR);
        $query->bindValue(':kommentar', $userComment, PDO::PARAM_STR);

        $imageQuery->bindValue(':datet', $currentDate);
        $imageQuery->bindValue(':picture', file_get_contents($uploadedFile['tmp_name']));
        $imageQuery->bindValue(':mimetype',($uploadedFile['type']));
        //execute query
        $imageQuery->execute();
        $query->execute();
    }

    echo $pageSections[0];

    foreach ($rows as $rowNumber => $user) {
        $fileId = 'imageRetriever.php'."?datet=".$user['Datet'];
        echo $fileId;

        $users = str_replace("---no---", $rowNumber + 1, $pageSections[1]);
        $users = str_replace("---time---", $user["Datet"], $users);
        $users = str_replace("---name---", $user["Namn"], $users);
        $users = str_replace("---email---", $user["Epostaddress"], $users);
        $users = str_replace("---homepage---", $user["Hemsida"], $users);
        $users = str_replace("---comment---", $user["Kommentar"], $users);
        $users = str_replace("---image_src---", $fileId, $users);
        echo $users;
    }
    $pdo->commit(); 
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {

        $pdo->rollBack();
        echo nl2br("\nErrors found" . $e->getMessage());
    }
}

echo $pageSections[2];

