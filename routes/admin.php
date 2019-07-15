<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views da administração.
 * 
 */

use \App\View as View;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app->get("/admin", function(){

    $view = new View(true, false, false);
    $view->draw('admin-home');

});

// Pagina login do admin.
$app->get("/admin/signin", function(){

    $view = new View(true, false, false);

    $view->draw("signin-admin");

});

$app->get("/admin/tickets", function(){

    $view = new View(true, false, false);

    $view->draw("admin-tickets");

});

$app->get("/admin/ticket/4", function(){

    $view = new View(true, false, false);

    $view->draw("admin-ticket-details");

});

$app->get("/admin/ticket/new", function(){

    $view = new View(true, false, false);

    $view->draw("admin-ticket-new");

});

?>