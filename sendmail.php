<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'tj', 'en', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('info@fls.guru', 'My address');
// Кому отправить
$mail->addAddress('code@fls.guru');
// Тема письма
$mail->Subject = "Hi it's me Saidbek";

// Тело письма
$body = '<h1>Good morning</h1>';

if (trim(!empty($_POST['name']))){
	$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))){
	$body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
}

// Прекрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
	// Путь загрузки файла
	$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
	// Грузим файл
	if (copy($_FILES['image']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$body.='<p><strong>Photo in the app </strong>';
		$mail->addAttachment($fileAttach);
	}
}

$mail->Body = $body;

// Отправляем
if(!$mail->send()) {
	$message = 'Worrning';
}else{
	$message = 'Your message was send';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>