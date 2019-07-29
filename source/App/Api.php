<?php
/**
 * 
 * Controller API's
 * 
 */

namespace Source\App;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\Core\User;
use Source\Core\Company;
use Source\Core\Ticket;

class Api{

    /**
     * Usuário logado
     */
    public function userLogged(ServerRequestInterface $req, ResponseInterface $res){
    
        return $res->withJson((new User)->getAuthenticatedPerson());

    }

    /**
     * Lista de empresas
     */
    public function getCompanies(ServerRequestInterface $req, ResponseInterface $res){

        return $res->withJson((new Company)->getCompanies());

    }

    /**
     * Lista de locais
     */
    public function getPlaces(ServerRequestInterface $req, ResponseInterface $res, $args){

        $company = new Company();

        $result = $company->getPlaces($args['idCompany']);

        return $res->withJson($result);

    }

    /**
     * Lista de setores
     */
    public function getSectors(ServerRequestInterface $req, ResponseInterface $res, $args){

        $company = new Company();

        $result = $company->getSectors($args['idCompany']);

        return $res->withJson($result);

    }

    /**
     * Lista de tickets do usuário
     */
    public function getTicketsList(ServerRequestInterface $req, ResponseInterface $res, $args){

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

    }

    /**
     * Lista de prioridades
     */
    public function getPriorities(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();
        $results = $ticket->getPriorities();
    
        return $res->withJson($results);

    }

    /**
     * Abre um ticket.
     */
    public function ticketOpen(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();

        $ticket = new Ticket();
        $user = new User();
    
        $result = $ticket->open($user, $body);
    
        return $res->withJson($result);

    }

    /**
     * Lista de status existents.
     */
    public function ticketStatus(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();
        $results = $ticket->getStatus();
    
        return $res->withJson($results);
    

    }

    /**
     * Detalhes de um tickets
     */
    public function ticketDetails(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();
        $user = new User();
    
        $results = $ticket->getTicket($user, "0", $args['ticketId']);
    
        return $res->withJson($results);

    }

    /**
     * Adiciona uma mensagem ao ticket.
     */
    public function ticketAddMessage(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();
        $ticketId = $args['ticketId'];
    
        $user = new User();
        $ticket = new Ticket();
        $result = $ticket->addMessage($ticketId, $user, $body);
    
        return $res->withJson($result);

    }

    /**
     * Lista de usuários.
     */
    public function getUsersList(ServerRequestInterface $req, ResponseInterface $res, $args){

        $user = new User();

        $body = $req->getParsedBody();
        $result = $user->listUsers($body['search']);
    
        return $res->withJson($result);

    }

    /**
     * Quantidade de usuários
     */
    public function getUsersQtt(ServerRequestInterface $req, ResponseInterface $res, $args){

        $user = new User();

        $result = $user->getQtd();
    
        return $res->withJson($result);

    }

    /**
     * Lista de empresas
     */
    public function getCompaniesList(ServerRequestInterface $req, ResponseInterface $res, $args){

        $company = new Company();
        $body = $req->getParsedBody();
    
        $result = $company->getCompanies($body['search']);
    
        return $res->withJson($result);

    }

    /**
     * Quantidade de empresas
     */
    public function getCompaniesQtt(ServerRequestInterface $req, ResponseInterface $res, $args){

        $company = new Company();

        $result = $company->getQuantity();
    
        return $res->withJson($result);

    }

}

?>