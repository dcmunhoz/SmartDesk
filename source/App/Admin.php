<?php
/**
 * 
 * Controller da pagina administrativa.
 * 
 */

namespace Source\App;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\Utils\View;
use Source\Core\User;

class Admin {

    /**
     * Pagina inicial
     */
    public function home(){

        $view = new View(true, false, false);
        $view->draw('admin-home');

    }
    
    /**
     * Pagina autenticação
     */
    public function signin(){
        
        $view = new View(false, false, false);

        $view->draw("admin-signin");

    }

    /**
     * Post autenticação
     */
    public function signinPost(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $user = new User();
        $result = $user->login($body);    
        
        if($result['error']){
            $newResponse = $res->withStatus(500);
        
            return $newResponse->withJson($result);
        }    
        
        return $res->withJson([]);

    }

    /**
     * Pagina tickets
     */
    public function tickets(){

        $view = new View(true, false, false);

        $view->draw("admin-tickets");

    }

    /**
     * Pagina detalhe tickets
     */
    public function ticketDetails(){

        $view = new View(true, false, false);

        $view->draw("admin-ticket-details");

    }

    /**
     * Pagina novo ticket.
     */
    public function ticketNew(){

        $view = new View(true, false, false);

        $view->draw("admin-ticket-new");

    }

    /**
     * Pagina configurações
     */
    public function configs(){

        $view = new View(true, false, false);

        $view->draw('admin-configs');

    }

    /**
     * Pagina novo usuário
     */
    public function userNew(){
        
        $view = new View(true, false, false);

        $view->draw('admin-user-new');
        
    }

    /**
     * 
     * Adiciona um novo usuário.
     * 
     */
    public function postUserNew(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $user = new User();
        $user->setid_company($body['company']);
        $user->setpassw($body['pascreate-passsw']);
        $user->setemail($body['email']);
        $user->setfull_name($body['full-name']);
        $user->setid_place($body['local']);
        $user->setid_profile($body['profile']);
        $user->setid_sector($body['sector']);
        $user->setuser_active( ( $body['user-active'] === "on" ) ? 1 : 0 );
        $user->setusername($body['username']);

        $result = $user->save();
                
        return $res->withJson($result);
        
    }

    /**
     * Pagina nova empresa
     */
    public function comanyNew(){

        $view = new View(true, false, false);

        $view->draw('admin-company-new');

    }

    /**
     * Pagina novo local
     */
    public function placeNew(){

        $view = new View(true, false, false);

        $view->draw('admin-place-new');

    }

    /**
     * Pagina novo setor
     */
    public function sectorNew(){

        
        $view = new View(true, false, false);

        $view->draw('admin-sector-new');

    }

    /**
     * Pagina nova prioridade
     */
    public function priorityNew(){

        $view = new View(true, false, false);

        $view->draw('admin-priority-new');

    }

    /**
     * Pagina atualização usuário
     */
    public function userUpdate(){
        
        $view = new View(true, false, false);

        $view->draw('admin-user-update');

    }

    /**
     * Pagina atualização empresa
     */
    public function companyUpdate(){
        
        $view = new View(true, false, false);

        $view->draw('admin-company-update');

    }

    /**
     * Pagina atualização local
     */
    public function placeUpdate(){
        
        $view = new View(true, false, false);

        $view->draw('admin-place-update');

    }

    /**
     * Pagina atualização setor
     */
    public function sectorUpdate(){
        
        $view = new View(true, false, false);

        $view->draw('admin-sector-update');

    }

    /**
     * Pagina atualização prioridade
     */
    public function priorityUpdate(){
        
        $view = new View(true, false, false);

        $view->draw('admin-priority-update');

    }

}


?>