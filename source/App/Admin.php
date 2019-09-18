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
use Source\Core\Company;

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
        $user->setid_local($body['local']);
        $user->setid_profile($body['profile']);
        $user->setid_sector($body['sector']);
        $user->setactive( ( $body['user-active'] === "on" ) ? 1 : 0 );
        $user->setusername($body['username']);

        $result = $user->save();

        if( $result['error'] ){

            $newRes = $res->withStatus(500);

            return $newRes->withJson($result);

        }
                
        return $res->withJson($result);
        
    }

    /**
     * Pagina nova empresa
     */
    public function companyNew(){

        $view = new View(true, false, false);

        $view->draw('admin-company-new');

    }

    /**
     * Adiciona uma empresa.
     */
    public function postCompanyNew(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();


        $company = new Company();

        $company->setcompany_name($body['name']);

        $result = $company->save();

        if( $result['error'] ){

            $newRes = $res->withStatus(500);

            return $newRes->withJson($result);
        }

        return $res->withJson($result);

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
    public function userUpdate(ServerRequestInterface $req, ResponseInterface $res, $args){

        $view = new View(true, false, false);

        $view->draw('admin-user-update');

    }

    /**
     * Retorna os dados do usuário selecionado.
     */
    public function userFind(ServerRequestInterface $req, ResponseInterface $res, $args){

        $user = new User();

        $user->find((Int) $args['idUser']);

        return $res->withJson($user->getData());

    }

    /**
     * Atualiza um usuário.
     */
    public function postUserUpdate(ServerRequestInterface $req, ResponseInterface $res, $args){

        $body = $req->getParsedBody();

        $user = new User();
        $user->find($body['id_user']);
        $user->setid_user($body['id_user']);
        $user->setfull_name($body['full_name']);
        $user->setusername($body['username']);
        $user->setold_username($body['old_username']);
        $user->setemail($body['email']);
        $user->setactive( ( isset($body['active']) ) ? 1 : 0 );
        $user->setid_profile($body['profile']);
        $user->setid_company($body['company']);
        $user->setid_local($body['local']);
        $user->setid_sector($body['sector']);

        $result = $user->save();

        if( $result['error'] ){

            $newRes = $res->withStatus(500);

            return $newRes->withJson($result);

        }
                
        return $res->withJson($result);


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

    /**
     * Pagina reset de senha
     */
    public function userResetPassword() {

        $view = new View(true, false, false);

        $view->draw('admin-user-reset-password');

    }

}


?>