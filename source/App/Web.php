<?php
/**
 * 
 * Controller da pagina do usuário.
 * 
 */

namespace Source\App;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\Utils\View;
use Source\Core\User;
use Source\Core\Ticket;

class Web{


    /**
     * Pagina inicial.
     */
    public function home(){

        $view = new View();
        $view->draw("user-panel");

    }

    /**
     * Pagina Login.
     */
    public function signin(){

        $view = new View(false, false, false);
        $view->draw('signin');

    }

    /**
     * Post da pagina de Login.
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
     * Faz o logout do usuário.
     */
    public function logout(){

        $user = new User();
        $user->logout();

    }

    /**
     * Pagina de criação de usuário.
     */
    public function signup(){

        $view = new View(false, false, false);
        $view->draw("signup");
    
    }

    /**
     * Post da criação de usuário.
     */
    public function signupPost(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $user = new User;

        $user->setfull_name($body['create-name']);
        $user->setusername($body['create-username']);
        $user->setemail($body['create-email']);
        $user->setpassw($body['create-pass']);
        $user->setuser_active(1);
        $user->setid_profile(2);

        $result = $user->save();

        return $res->withJson($result);

    }

    /**
     * Pagina abri novo ticket.
     */
    public function ticketOpen(){

        $view = new View();
        $view->draw('user-ticket');

    }

    /**
     * Pagina colaboradores.
     */
    public function team(){
        
        $view = new View();
        $view->draw("team");

    }

    /**
     * Pagina detalhes ticket.
     */
    public function ticketDetails(ServerRequestInterface $req, ResponseInterface $res, $args){

        $ticket = new Ticket();
        $results = $ticket->getTicket("0", $args['ticketId']);

        $user = new User;
        $user->loadSessionUser();

        if ($results[$args['ticketId']]['ticket']['id_user'] != $user->getid_user()) {

            return $res->withJson(["Ooooops" => "Acesso Negado"]);

        }

        $view = new View();
        $view->draw("ticket-details");

    }

    /**
     * Pagina edição de usuário
     */
    public function profileEdit(ServerRequestInterface $req, ResponseInterface $res, $args){
        
        $user = new User();

        $authenticatedId = $user->getAuthenticatedUser()['id_user'];

        $bodyUserId = $args['userId'];
        
        if($bodyUserId !== $authenticatedId){

            $newResposne = $res->withStatus(500);

            return $newResposne->withJson(["error" => "Acesso Negado."]);

        }

        $view = new View(false, false);

        $view->draw('profile-edit');

    }

    /**
     * Atualiza o usuário
     */
    public function userUpdate(ServerRequestInterface $req, ResponseInterface $res){

        $body = $req->getParsedBody();

        $user = new User();
        $user->setid_user($body['update-user-id']);
        $user->setfull_name($body['update-full-name']);
        $user->setusername($body['update-username']);
        $user->setold_username($body['update-old-username']);
        $user->setemail($body['update-email']);
        $user->setid_company($body['update-user-company']);
        $user->setid_local($body['update-user-place']);
        $user->setid_sector($body['update-user-sector']);
        $user->setuser_active(1);
        $user->setid_profile(2);

        $result = $user->save();
    
        return $res->withJson($result);

    }

}

?>