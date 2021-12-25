<?php
    $allowedFormats = ["text/plain", "image/jpeg", "image/png"];
    $uploadedFile = $_FILES["file-upload"]["tmp_name"];
    $fileMime = mime_content_type($uploadedFile);
    $fileType = $_FILES["file-upload"]["type"];
    $fileType = explode('/', $fileType)[0];
    
    if(in_array($fileMime, $allowedFormats)){
        move_uploaded_file($uploadedFile, "upload/" . $_FILES["file-upload"]["name"]);  
        if($fileType != "text"){
            
            echo '<img src= "upload/'. $_FILES["file-upload"]["name"].'">';

        }

        else{

            echo file_get_contents("upload/".$_FILES["file-upload"]["name"]);
        }

    }else{
        echo $_FILES["file-upload"]["name"] . "<br>";
        echo mime_content_type($uploadedFile) . "<br>";
        echo $_FILES["file-upload"]["size"] . "<br>";
    }
?>