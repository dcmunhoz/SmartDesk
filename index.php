<?php
/**
 * 
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo inicial do php, contem toda a configuração do sistema e chamadas das rotas.
 * 
 */

    
require_once "config.php";

$app = new Slim\App($configs);

use Source\Utils\Mailer;

$app->get('/mail/test', function(){

    $mail = new Mailer();
    // $mail->setRecipients("dcmunhoz0@gmail.com", "Daniel Munhoz");
    // $mail->mailBody("Teste", "<b1>Teste hahaha</b1>");
    // $mail->mailSend();

    $recipients = [
        "email" => 'dcmunhoz0@gmail.com',
        "name"  => 'Daniel'
    ];

    $mailBody = [
        "subject" => "PARABEEEEENS",
        "body" => "É nois"
    ];

    $mail->make($recipients, $mailBody);

});


// Rotas
require "routes/site.php";  // Rotas referentes a view dos usuários.
require "routes/admin.php"; // Rotas referentes a view da administração.
require "routes/api.php";   // Rotas da api do sistema, retorna todos os dados necessários para as views.

$app->run();

?>