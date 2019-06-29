<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para manipulação dos dados do sistema.
 * 
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use App\User;


$app->get("/api/user-logged", function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $user = new User();

    $data = $user->getAuthenticatedUser();

    return $res->withJson($data);
    
});  

?>