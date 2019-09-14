<?php
/**
 * Classe responsavel por gerenciar os envios de email
 */

namespace Source\Utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use League\Plates\Engine;


class Mailer { 

    /**
     * @var
     */
    private $mail;

    public function __construct(){

        $this->mail = new PHPMailer();

        //Server settings
        $this->mail->SMTPDebug = 0;                                       // Enable verbose debug output
        $this->mail->isSMTP();                                            // Set mailer to use SMTP
        $this->mail->Host       = MAILER['smtpServer'];                   // Specify main and backup SMTP servers
        $this->mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $this->mail->Username   = MAILER['username'];                     // SMTP username
        $this->mail->Password   = MAILER['password'];                     // SMTP password
        $this->mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
        $this->mail->Port       = (INT) MAILER['port'];                   // TCP port to connect to
        
        //Recipients
        $this->mail->setFrom(MAILER['username'], 'Smartdesk Support');
        
        // Content
        $this->mail->isHTML(true);                                         // Set email format to HTML

        $this->mail->CharSet = "UTF-8";

    }

    public function make (Array $recipient = [], Array $mailBody = []) : void{

        $this->mail->addAddress($recipient['email'], $recipient['name']);
        $this->mail->Subject = $mailBody['subject'];
        $this->mail->Body = $mailBody['body'];
        $this->mail->send();

    }

    public function createHTML(String $filename, Array $data = []){

        $plates = new Engine(__DIR__ . '/../../views/mail');

        return $plates->render($filename, $data);

    }

    


}


?>