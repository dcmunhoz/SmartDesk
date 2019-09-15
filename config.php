<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo contendo configurações do servidor.
 * 
 */

// Requires
require "vendor/autoload.php"; // Composer

use Source\Utils\Config;
$config = new Config();

$configs = [
    'settings' =>[
        'displayErrorDetails' => true,
    ]
];

// Timezone e datas
date_default_timezone_set("America/Sao_Paulo");
setlocale(LC_ALL, "pt_BR");

// Constantes
define("DB", [
    "host" => $config->database->host,
    "database" => $config->database->base,
    "user" => $config->database->user,
    "password" => $config->database->password
]);

define("MAILER", [
    "send" => $config->mail->send,
    "smtpServer" => $config->mail->smtpServer,
    "username" => $config->mail->username,
    "password" => $config->mail->password,
    "port" => $config->mail->port 

]);
