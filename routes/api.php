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
use App\Model\DB;


$app->get("/api/user-logged", function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $user = new User();

    $data = $user->getAuthenticatedUser();

    return $res->withJson($data);
    
});  

$app->get("/api/company", function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $dao = new DB();
    $result = $dao->exec("SELECT * FROM tb_companies");

    return $res->withJson($result);

});


$app->get('/api/company/{idCompany}/places', function(ServerRequestInterface $req, ResponseInterface $res, $args){

    User::verifyLogin();

    $dao = new DB();
    $result = $dao->exec("SELECT * FROM tb_places WHERE id_company = :id_company", [
        ":id_company"=> $args['idCompany']
    ]);

    return $res->withJson($result);

});

$app->get('/api/company/{idCompany}/sectors', function(ServerRequestInterface $req, ResponseInterface $res, $args){

    User::verifyLogin();

    $dao = new DB();
    $result = $dao->exec("SELECT * FROM tb_sectors WHERE id_company = :id_company", [
        ":id_company"=> $args['idCompany']
    ]);
        
    return $res->withJson($result);

});

$app->get('/api/tickets/list', function(ServerRequestInterface $req, ResponseInterface $res){

    return $res->withJson(["msg"=>"Rota OK!"]);

});

?>