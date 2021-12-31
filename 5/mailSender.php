<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "PHPMailer\src\Exception.php";
require "PHPMailer\src\PHPMailer.php";
require "PHPMailer\src\SMTP.php";

$mail = new PHPMailer(true);


//Server settings
$mail->IsSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = $_POST['from'];
$mail->Password = 'Nocturne680';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->CharSet = "UTF-8";

//Atachments
$mail->setFrom($_POST["from"]);
$mail->addAddress($_POST["to"]);
if(isset($_POST["cc"])){ 
$mail->addCC($_POST["cc"]);
    echo nl2br("cc was set\n");   
}
if(isset($_POST["bcc"])){
$mail->addBCC($_POST["bcc"]);
    echo nl2br("bcc was set\n");
}


//Content
//message body
$messageContent = $_POST["message"];
$mail->Body = htmlspecialchars("$messageContent\n\nObservera! Detta meddelande är sänt från ett formulär på Internet och avsändaren kan vara felaktig!");
$mail->Subject = $_POST["subject"];


if($mail->send()){
    echo "sent please check inbox";
}else{
    echo "not sent";

    echo "Error: $mail->ErrorInfo";
}




