<?php
/**
 * 
 * Controller API's
 * 
 */

namespace Source\App;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\Model\DB;
use Source\Core\User;
use Source\Core\Company;
use Source\Core\Ticket;
use Source\Core\Local;
use Source\Core\Sector;
use Source\Core\Priority;
use Source\Core\Profile;

class Api{

    /**
     * Usuário logado
     */
    public function userLogged(ServerRequestInterface $req, ResponseInterface $res){
        
        $user = new User();
        $user->loadSessionUser();

        return $res->withJson($user->getAuthenticatedPerson());

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
    
        $ticket = new Ticket();
    
        $result = $ticket->getTicket($status, null);
    
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
        $ticket->setid_ticket($body['id_ticket']);
        $ticket->settitle($body['ticket-title']);
        $ticket->setdescription($body['ticket-desc']);
        $ticket->setid_priority($body['ticket-priority']);
        $ticket->setid_appl($body['user-request']);
        $ticket->setassignments(json_decode($body['assignments']));
    
        $result = $ticket->open();
    
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
    
        $results = $ticket->getTicket("0", $args['ticketId']);

        return $res->withJson($results);

    }

    /**
     * Adiciona uma mensagem ao ticket.
     */
    public function ticketAddMessage(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();
        $ticketId = $args['ticketId'];
    
        $user = new User();
        $user->loadSessionUser();
        $ticket = new Ticket();
        $result = $ticket->addMessage($ticketId, $user, $body, "M");
    
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

    /**
     * Lista de locais
     */
    public function getLocalsList(ServerRequestInterface $req, ResponseInterface $res, $args){

        $local = new Local();
        $body = $req->getParsedBody();
    
        $result = $local->getLocals($body['search'], $body['company']);
    
        return $res->withJson($result);

    }

    /**
     * Quantidade de locais
     */
    public function getLocalsQtt(ServerRequestInterface $req, ResponseInterface $res, $args){

        $local = new Local();

        $result = $local->getQuantity();
    
        return $res->withJson($result);

    }

    /**
     * Lista de setores
     */
    public function getSectorsList(ServerRequestInterface $req, ResponseInterface $res, $args){

        $sector = new Sector();
        $body = $req->getParsedBody();
    
        $result = $sector->getSectors($body['search']);
    
        return $res->withJson($result);

    }

    /**
     * Quantidade de setores
     */
    public function getSectorsQtt(ServerRequestInterface $req, ResponseInterface $res, $args){

        $sector = new Sector();

        $result = $sector->getQuantity();
    
        return $res->withJson($result);

    }

    /**
     * Lista de prioridades
     */
    public function getPrioritiesList(ServerRequestInterface $req, ResponseInterface $res, $args){

        $priority = new Priority();
        $body = $req->getParsedBody();
    
        $result = $priority->getPriorities($body['search']);
    
        return $res->withJson($result);

    }

    /**
     * Dados da pagina de tickets.
     */
    public function getTicketPagedata(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();

        $result = $ticket->getTicketPageData();

        return $res->withJson($result);

    }

    /**
     * Lista de Tickets
     */
    public function getTickets(ServerRequestInterface $req, ResponseInterface $res, $args){

        $newType = "";

        foreach (explode("-", $args['type']) as $key => $value) {
            $newType .= ucfirst($value);
        }
    
        $ticket = new Ticket();
    
        $search = $req->getQueryParams()['s'];
        $select = $req->getQueryParams()['q'];
    
        $data = $ticket->{"get$newType"}($search, $select);
    
        if (count($data) == 0) {
            return $res->withStatus(500);
        }
    
        return $res->withJson($data);        

    }

    /**
     * Retorna a lista de perfis disponiveis
     */
    public function getProfilesList(ServerRequestInterface $req, ResponseInterface $res){

        return $res->withJson((new Profile)->getProfiles());
        
    }

    /**
     * Dados da empresa
     */
    public function companyFind(ServerRequestInterface $req, ResponseInterface $res, $args){

        $company = new Company();

        $result = $company->find($args['idCompany']);

        return $res->withJson($result);

    }

    public function companyUpdate(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();

        $company = new Company();
        $company->setid_company($body['id_company']);
        $company->setcompany_name($body['company_name']);

        $result = $company->save();

        if ($result['error']) {

            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);

        }

        return $res->withJson($body);

    }

    public function placeNew(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $local = new Local();
        $local->setlocal_name($body['local_name']);
        $local->setid_company($body['company']);
        $local->setcity_cep($body['city-cep']);
        $local->setcity_name($body['city-name']);

        $result = $local->save();

        if($result['error']){

            $newRes = $res->withStatus(500);

            return $newRes->withJson($result);

        }  

        return $res->withJson($result);
    }

    public function localFind(ServerRequestInterface $req, ResponseInterface $res, $args){
        
        $idLocal = $args['idLocal'];

        $local = new Local();

        $local->setid_local($idLocal);
        $result = $local->find();

        return $res->withJson($result);


    }

    public function localUpdate(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();
        
        $local = new Local();
        $local->setid_local($body['id_local']);
        $local->setlocal_name($body['local_name']);
        $local->setid_company($body['id_company']);
        $local->setcity_cep($body['city_cep']);
        $local->setcity_name($body['city_name']);

        $result = $local->save();

        if ($result['error']) {

            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);

        }

        return $res->withJson($body);
    }

    public function sectorNew(ServerRequestInterface $req, ResponseInterface $res){
        
        $body = $req->getParsedBody();

        $sector = new Sector();
        $sector->setid_local($body['local']);
        $sector->setsector_name($body['sector-name']);

        $result = $sector->save();

        if($result['error']){

            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);
        }

        return $res->withJson($result);
    }

    public function sectorFind(ServerRequestInterface $req, ResponseInterface $res, $args){

        $idSector = $args['idSector'];
        
        $sector = new Sector();
        $sector->setid_sector($idSector);
        $result = $sector->find();

        return $res->withJson($result);

    }

    public function sectorUpdate(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $sector = new Sector();
        $sector->setid_sector($body['id_sector']);
        $sector->setid_local($body['id_local']);
        $sector->setsector_name($body['sector_name']);

        $result = $sector->save();
        
        if($result['error']){

            $res = $res->withStatus(500);
            return $res->withJson($result);

        }

        return $res->withJson($result);

    }

    public function priorityNew(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $priority = new Priority();
        $priority->setpriority_name($body['priority_name']);
        $priority->setpriority_color($body['priority_color']);

        $result = $priority->save();

        if($result['error']){
            
            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);

        }

        return $res->withJson($body);

    }

    public function priorityUpdate(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $priority = new Priority();
        $priority->setid_priority($body['id_priority']);
        $priority->setpriority_name($body['priority_name']);
        $priority->setpriority_color($body['priority_color']);

        $result = $priority->save();

        if($result['error']){
            
            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);

        }

        return $res->withJson($body);

    }

    public function priorityFind(ServerRequestInterface $req, ResponseInterface $res, $args){

        $idPriority = $args['idPriority'];

        $priority = new Priority();
        $priority->setid_priority($idPriority);
        $result = $priority->find();

        return $res->withJson($result);

    }

    public function assignMe(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();
        
        $ticket = new Ticket();

        $idUser = $body['idUser'];
        $idTicket = $args['idTicket'];
        
        $ticket->setid_ticket($idTicket);
        $result = $ticket->assign($idUser);

        if ($result['error']) {

            $newRes = $res->withStatus(500);
            return $newRes->withJson($result);

        }

        return $res->withJson($result);


    }

    public function ticketAssigned(ServerRequestInterface $req, ResponseInterface $res, $args){

        var_dump($args);
        die;

    }

    public function getTeam(ServerRequestInterface $req, ResponseInterface $res){

        $user = new User();

        $result = $user->getTeam();

        return $res->withJson($result);

    }

    public function getUserLocals(ServerRequestInterface $req, ResponseInterface $res, $args){

        $idUser = $args['idUser'];

        $local = (new Local)->getUserLocals((int) $idUser);

        return $res->withJson($local);

    }

    public function getUserSectors(ServerRequestInterface $req, ResponseInterface $res, $args){

        $idUser = $args['idUser'];

        $sector = (new Sector)->getUserSectors((int) $idUser);

        return $res->withJson($sector);

    }

    public function getTicketDetails(ServerRequestInterface $req, ResponseInterface $res, $args){
        
        $ticketId = $args['ticketId'];

        $ticket = new Ticket();

        $ticket->find($ticketId);

        $result = $ticket->getData();

        return $res->withJson($result);


    }

    public function putTicketEnd(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticketID = $args['ticketId'];
        $user = new User;
        $user->loadSessionUser();

        $body = $req->getParsedBody();

        $ticket = new Ticket();
        $ticket->find($ticketID);
        $result = $ticket->end();
        
        if (!$result) {
            $newRes = $res->withStatus(500);
            return $newRes->withJson([
                "error" => true,
                "message" => "Ticket já finalizado."
            ]);
        }
            
        $ticket->addMessage($ticketID, $user, $body, 'S');
        return $res->withJson(["OK" => true]);

    }

    public function unassignUser(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();

        $ticket->setid_ticket($args['idTicket']);
        $ticket->unassign($args['idUser']);

        return $res;

    }

    public function getQttMonths(ServerRequestInterface $req, ResponseInterface $res){
        
        $dao = new DB();

        $date = \date('m');

        $result = $dao->exec("
            select date_format(dt_creation, '%m') as 'Month', count(*) as 'QTT' from tb_tickets
            where date_format(dt_creation, '%m') <= {$date}
            group by Month
            order by Month Desc
            limit 5;
        ");

        $months = [
            "01"=>"Janeiro",
            "02"=>"Fevereiro",
            "03"=>"Março",
            "04"=>"Abril",
            "05"=>"Maio",
            "06"=>"Junho",
            "07"=>"Julho",
            "08"=>"Agosto",
            "09"=>"Setembro",
            "10"=>"Outubro",
            "11"=>"Novembro",
            "12"=>"Dezembro"            
        ];

        $data = [];

        return $res->withJson($months["03"]);

    }

    public function getQttTickets(ServerRequestInterface $req, ResponseInterface $res){

        $dao = new DB();

        $today = date('d/m/Y');
        
        $result = $dao->exec("SELECT COUNT(*) as 'total' FROM tb_tickets WHERE date_format(dt_creation, '%d/%m/%Y') = :today ", [
            ":today" => $today
        ])[0];
            
        return $res->withJson($result);        

    }
}

?>