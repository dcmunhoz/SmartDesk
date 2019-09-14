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

    $page = new League\Plates\Engine(__DIR__ . '/views/mail');   

    echo $page->render('user-new-ticket', ['id' => '130', 'prioridade' => "Urgente", "detalhes" => "Me ajuda por favor", "solicitante" => "Daniel"]);

});


// Rotas
require "routes/site.php";  // Rotas referentes a view dos usuários.
require "routes/admin.php"; // Rotas referentes a view da administração.
require "routes/api.php";   // Rotas da api do sistema, retorna todos os dados necessários para as views.

$app->run();

?>