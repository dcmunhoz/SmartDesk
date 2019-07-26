<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para manipulação dos dados do sistema.
 * 
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use App\Model\DB;
use App\User;
use App\Ticket;
use App\Company;
use App\Local;
use App\Sector;
use App\Priority;


$app->get("/api/user-logged", function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $user = new User();

    $data = $user->getAuthenticatedPerson();

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

    User::verifyLogin();

    $status;

    if(!isset($req->getQueryParams()['status']) || is_null($req->getQueryParams()['status']) || $req->getQueryParams()['status'] === "" || $req->getQueryParams()['status'] === "null"  ){

        $status = "0";

    }else{
        $status = $req->getQueryParams()['status'];
    }

    $user = new User();
    $ticket = new Ticket();

    $result = $ticket->getTicket($user, $status, null);

    if(!count($result) > 0){

        $newResponse = $res->withStatus(500);

        return $newResponse->withJson(["error"=>true,"msg"=>"Nenhum ticket a ser exibido"]);

    }

    return $res->withJson($result);

});

$app->get('/api/priorities', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $ticket = new Ticket();
    $results = $ticket->getPriorities();

    return $res->withJson($results);

});

$app->post('/ticket/open', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();

    $body = $req->getParsedBody();

    $ticket = new Ticket();
    $user = new User();

    $result = $ticket->open($user, $body);

    return $res->withJson($result);

});

$app->get('/api/ticket/status', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin();
    $ticket = new Ticket();
    $results = $ticket->getStatus();

    return $res->withJson($results);


});

$app->get("/api/ticket/{ticketId}/details", function(ServerRequestInterface $req, ResponseInterface $res, $args ){

    User::verifyLogin();

    $ticket = new Ticket();
    $user = new User();

    $results = $ticket->getTicket($user, "0", $args['ticketId']);

    return $res->withJson($results);

});

$app->post('/api/ticket/{ticketId}/add-message', function(ServerRequestInterface $req, ResponseInterface $res, $args){

    User::verifyLogin();

    $body = $req->getParsedBody();
    $ticketId = $args['ticketId'];

    $user = new User();
    $ticket = new Ticket();
    $result = $ticket->addMessage($ticketId, $user, $body);

    return $res->withJson($result);

});

$app->post('/api/admin/users/list', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $user = new User();

    $body = $req->getParsedBody();
    $result = $user->listUsers($body['search']);

    return $res->withJson($result);

});

$app->get('/api/admin/users/qtd', function(ServerRequestInterface $req, ResponseInterface $res){
    
    User::verifyLogin(true);

    $user = new User();

    $result = $user->getQtd();

    return $res->withJson($result);

});

$app->post('/api/admin/companies/list', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $company = new Company();
    $body = $req->getParsedBody();

    $result = $company->getCompanies($body['search']);

    return $res->withJson($result);
});

$app->get('/api/admin/companies/quantity', function($req, ResponseInterface $res){

    User::verifyLogin(true);

    $company = new Company();

    $result = $company->getQuantity();

    return $res->withJson($result);

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

$app->get('/api/admin/tickets/list/all', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $ticket = new Ticket();

    $data = $ticket->getAll();

    if (count($data) == 0) {
        return $res->withStatus(500);
    }

    return $res->withJson($data);

});

$app->get('/api/admin/tickets/list/assign-me', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $ticket = new Ticket();

    $data = $ticket->getAssignMe();

    if (count($data) == 0) {
        return $res->withStatus(500);
    }

    return $res->withJson($data);

});

$app->get('/api/admin/tickets/list/no-assign', function(ServerRequestInterface $req, ResponseInterface $res){

    User::verifyLogin(true);

    $ticket = new Ticket();

    $data = $ticket->getNoAssign();

    if (count($data) == 0) {
        return $res->withStatus(500);
    }

    return $res->withJson($data);

});


?>