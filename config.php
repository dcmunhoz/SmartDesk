<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo contendo configurações do servidor.
 * 
 */

// Requires.
require "vendor/autoload.php"; // Composer

$configs = [
    'settings' =>[
        'displayErrorDetails' => true,
    ]
];

// Timezone e datas
date_default_timezone_set("America/Sao_Paulo");
setlocale(LC_ALL, "pt_BR");


