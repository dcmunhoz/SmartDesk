<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views da administração.
 * 
 */

use \App\Model\View as View;

// Pagina inicial do admin.
$app->get("/admin", function(){

    $view = new View(false, false);

    $view->draw("signin-admin");

});

?>