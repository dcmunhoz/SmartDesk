<?php
/**
 * 
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo inicial do php, contem toda a configuração do sistema e chamadas das rotas.
 * 
 */

    
require_once "config.php";

$app = new Slim\App([
    'settings' =>[
        'displayErrorDetails' => true,
    ]
]);


// Rotas
require "routes/site.php";  // Rotas referentes a view dos usuários.
require "routes/admin.php"; // Rotas referentes a view da administração.
require "routes/api.php";   // Rotas da api do sistema, retorna todos os dados necessários para as views.

$app->run();

?>