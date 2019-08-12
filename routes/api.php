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
use Source\Core\User;

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
    
    $app->post("/users/list", Api::class . ":getUsersList");
    $app->get("/users/qtd", Api::class . ":getUsersQtt");
    $app->post("/companies/list", Api::class . ":getCompaniesList");
    $app->get("/companies/quantity", Api::class . ":getCompaniesQtt");
    $app->post("/locals/list", Api::class . ":getLocalsList");
    $app->get("/locals/quantity", Api::class . ":getLocalsQtt");
    $app->post("/sectors/list", Api::class . ":getSectorsList");
    $app->get("/sectors/quantity", Api::class . ":getSectorsQtt");
    $app->post("/priorities/list", Api::class . ":getPrioritiesList");
    $app->get("/ticket-page-data", Api::class . ":getTicketPagedata");
    $app->get("/tickets/list/{type}", Api::class . ":getTickets");
    $app->get("/profiles/list", Api::class . ":getProfilesList");
    $app->get("/company/{idCompany}/find", Api::class . ":companyFind");
    $app->post("/company/{idCompany}/update", Api::class . ":companyUpdate");
    $app->post("/local/new", Api::class . ":placeNew");
    $app->get("/local/{idLocal}/find", Api::class . ":localFind");
    $app->post("/local/{idLocal}/update", Api::class . ":localUpdate");
    $app->post("/sector/new", Api::class . ":sectorNew");
    $app->get("/sector/{idSector}/find", Api::class . ":sectorFind");
    $app->post("/sector/update", Api::class . ":sectorUpdate");
    $app->post("/priority/new", Api::class . ":priorityNew");
    
})->add(function($req, $res, $next){

    User::verifyLogin(true);
    
    $res = $next($req, $res);
    return $res;

});

?>