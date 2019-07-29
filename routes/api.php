<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para manipulação dos dados do sistema.
 * 
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\App\Api;

/**
 * API:Web
 */
$app->group("/api", function(Slim\App $app){

    $app->get("/user-logged", Api::class . ":userLogged");
    $app->get("/company", Api::class . ":getCompanies");
    $app->get("/company/{idCompany}/places", Api::class . ":getPlaces");
    $app->get("/company/{idCompany}/sectors", Api::class . ":getSectors");
    $app->get("/tickets/list", Api::class . ":getTicketsList");
    $app->get("/priorities", Api::class . ":getPriorities");
    $app->post("/ticket/open", Api::class . ":ticketOpen");
    $app->get("/ticket/status", Api::class . ":ticketStatus");
    $app->get("/ticket/{ticketId}/details", Api::class . ":ticketDetails");
    $app->post("/ticket/{ticketId}/add-message", Api::class . ":ticketAddMessage");

})->add(function($req, $res, $next){

    User::verifyLogin();
    
    $res = $next($req, $res);
    return $res;

});

/**
 * API:Admin
 */
$app->group("/api/admin", function(Slim\App $app){
    
    $app->get("/users/list", Api::class . ":getUsersList");
    $app->get("/users/qtd", Api::class . ":getUsersQtt");
    $app->get("/companies/list", Api::class . ":getCompaniesList");
    $app->get("/companies/quantity", Api::class . ":getCompaniesQtt");

})->add(function($req, $res, $next){

    User::verifyLogin(true);
    
    $res = $next($req, $res);
    return $res;

});


$app->post('/api/admin/locals/list', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $local = new Local();

    $result = $local->getLocals($req->getParsedBody()['search']);

    return $res->withJson($result);

});

$app->get('/api/admin/locals/quantity', function($req, ResponseInterface $res){

    User::verifyLogin(true);

    $local = new Local();

    $result = $local->getQuantity();

    return $res->withJson($result);

});

$app->post('/api/admin/sectors/list', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $sector = new Sector();

    $result = $sector->getSectors($req->getParsedBody()['search']);

    return $res->withJson($result);

});

$app->get('/api/admin/sectors/quantity', function($req, ResponseInterface $res){

    User::verifyLogin(true);

    $sector = new Sector();

    $result = $sector->getQuantity();

    return $res->withJson($result);

});

$app->post('/api/admin/priorities/list', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $priority = new Priority();

    $result = $priority->getPriorities($req->getParsedBody()['search']);

    return $res->withJson($result);

});

$app->get('/api/admin/priorities/quantity', function($req, ResponseInterface $res){

    User::verifyLogin(true);

    $sector = new Sector();

    $result = $sector->getQuantity();

    return $res->withJson($result);

});

$app->get('/api/admin/ticket-page-data', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);
    
    $ticket = new Ticket();

    $result = $ticket->getTicketPageData();

    return $res->withJson($result);

});

$app->get('/api/admin/tickets/list/{type}', function(ServerRequestInterface $req, ResponseInterface $res, $args){

    $newType = "";

    foreach (explode("-", $args['type']) as $key => $value) {
        $newType .= ucfirst($value);
    }

    User::verifyLogin(true);

    $ticket = new Ticket();

    $search = $req->getQueryParams()['s'];
    $select = $req->getQueryParams()['q'];

    $data = $ticket->{"get$newType"}($search, $select);

    if (count($data) == 0) {
        return $res->withStatus(500);
    }

    return $res->withJson($data);

});

?>