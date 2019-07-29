<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views de usuários.
 *  
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\App\Web;
use Source\Core\User;

/**
 * WEB
 */
$app->group("", function(Slim\App $app){

    $app->get("/", Web::class . ":home");
    $app->get("/signin", Web::class . ":signin");
    $app->post("/signin", Web::class . ':signinPost');
    $app->get("/logout", Web::class . ':logout');
    $app->get("/signup", Web::class . ":signup");
    $app->post("/signup", Web::class . ":signupPost");
    $app->get("/ticket/open", Web::class . ":ticketOpen");
    $app->get("/team", Web::class . ":team");
    $app->get("/ticket/{ticketId}/details", Web::class . ":ticketDetails");
    $app->get("/profile/{userId}/edit", Web::class . ":profileEdit");
    $app->post("/user/update", Web::class . ":userUpdate");

})->add(function($req, $res, $next){

    // Middleware que verifica se o usuário esta logado, para acessar as rotas.

    $path = $req->getUri()->getPath();
    $excluded = ['/signin', '/signup'];
    
    if( !in_array($path, $excluded) ){

        User::verifyLogin();

    }    
    
    $res = $next($req, $res);
    return $res;

});

?>