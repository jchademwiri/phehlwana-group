<?php

$message_sent = false;
if(isset($_POST['email'])&& $S_POST['email'] != ''){

if( filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {

// submit the form

$userName = $_POST['name'];
$userEmail = $_POST['email'];
$messageSubject = $_POST['subject'];
$Message = $_POST['message'];


$to = "info@procute.co.za";
$body = "";

$body .="From: ".$userName. "\r\n";
$body .="Email: ".$userEmail. "\r\n";
$body .="Message: ".$message. "\r\n";


//mail($to,$messageSubject,$body);

$message_sent = true;
}


}





?>