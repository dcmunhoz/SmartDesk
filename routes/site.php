<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views de usuáarios.
 *  
 */

use \App\View;
use \App\User;
use \App\Model\DB;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

// Pagina principal
$app->get("/", function(){

    User::verifyLogin();
    
    $view = new View();
    $view->draw("user-panel");

});

// Pagina de login
$app->get("/signin", function(){

    $view = new View(false, false);
    $view->draw('signin');

});

$app->post("/signin", function(ServerRequestInterface $req, ResponseInterface $res, $args){

    $body = $req->getParsedBody();

    $user = new User();
    $result = $user->login($body);

    if($result['error']){
        $newResponse = $res->withStatus(500);
    
        return $newResponse->withJson($result);
    }   
    return $res->withJson([]);
    
});

$app->get("/logout", function(){

    User::verifyLogin();

    $user = new User();
    $user->logout();

});

// Pagina de cadastro
$app->get("/signup", function(){

    $view = new View(false, false);
    $view->draw("signup");

});

$app->post('/signup', function(ServerRequestInterface $req, ResponseInterface $res, $args){

    $body = $req->getParsedBody();

    $user = new User;
    $result = $user->createUser($body);

    // return $res;
    // var_dump($body);

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

// Perfil do usuário
$app->get("/profile/{userId}/edit", function($req, $res, $args){

    User::verifyLogin();

    $user = new User();

    $authenticatedId = $user->getAuthenticatedUser()['id_user'];

    $bodyUserId = $args['userId'];
    
    if($bodyUserId !== $authenticatedId){

        $newResposne = $res->withStatus(500);

        return $newResposne->withJson(["error" => "Acesso Negado."]);

    }

    $view = new View(false, false);

    $view->draw('profile-edit');
});

?>