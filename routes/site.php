<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views de usuáarios.
 *  
 */

use \App\Model\View as View;

// Pagina principal
$app->get("/", function(){

    $view = new View();
    $view->draw("user-panel");

});

// Pagina de login
$app->get("/signin", function(){

    $view = new View(false, false);
    $view->draw('signin');

});

// Pagina de cadastro
$app->get("/signup", function(){

    $view = new View(false, false);
    $view->draw("signup");


});
// Pagina para abrir novo ticket
$app->get("/ticket/open", function(){
    $view = new View();
    $view->draw('user-ticket');

});

// Pagina para exibir a equipe cadastrada
$app->get("/team", function(){

    $view = new View();
    $view->draw("team");

});

// Pagina que exibe detalhes do ticket
$app->get("/ticket/2058/details", function(){

    $view = new View();
    $view->draw("ticket-details");
    
});

?>