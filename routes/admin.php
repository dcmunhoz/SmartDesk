<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views da administração.
 * 
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\App\Admin;
use Source\Core\User;

$app->group('/admin', function(Slim\App $app){

    $app->get("", Admin::class . ":home");
    $app->get("/signin", Admin::class . ":signin");
    $app->post("/signin", Admin::class . ":signinPost");
    $app->get("/tickets", Admin::class . ":tickets");
    $app->get("/ticket/4", Admin::class . ":ticketDetails");
    $app->get("/ticket/new", Admin::class . ":ticketNew");
    $app->get("/configs", Admin::class . ":configs");
    $app->get("/user/new", Admin::class . ":userNew");
    $app->get("/company/new", Admin::class . ":companyNew");
    $app->get("/place/new", Admin::class . ":placeNew");
    $app->get("/sector/new", Admin::class . ":sectorNew");
    $app->get("/priority/new", Admin::class . ":priorityNew");
    $app->get("/user/4", Admin::class . ":userUpdate");
    $app->get("/company/4", Admin::class . ":companyUpdate");
    $app->get("/place/4", Admin::class . ":placeUpdate");
    $app->get("/sector/4", Admin::class . ":sectorUpdate");
    $app->get("/priority/4", Admin::class . ":priorityUpdate");

})->add(function($req, $res, $next){

    
    $path = $req->getUri()->getPath();
    $excluded = ['/admin/signin', '/admin/signup'];
    
    if( !in_array($path, $excluded) ){

        User::verifyLogin(true);

    }    
    
    $res = $next($req, $res);
    return $res;


});

?>