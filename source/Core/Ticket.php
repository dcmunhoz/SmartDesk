<?php
/**
 *  @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 *  Classe responsavel por controlar as ações do ticket.
 * 
 */

namespace Source\Core;

use Source\Model\DB;
use Source\Model\ClassModel;
use Source\Core\User;

class Ticket extends ClassModel{

    public function __construct(){



    }

    /**
     * 
     * Retorna 
     * 
     */
    public function getAll(string $search = "", string $status = ""): array{

        $params = [];

        if($search !== ""){

            $search = "= " . $search;

        }

        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }

        if($status == '0'){
            $status = "";
        }

        $query = "
            SELECT * FROM tb_tickets t
            JOIN tb_status s USING(id_status)
            JOIN tb_priorities pr USING(id_priority)
            JOIN tb_persons p ON p.id_user = t.id_user
            WHERE t.id_ticket $search AND t.id_status $status
            ORDER BY t.id_ticket DESC
        ";


        $data = $this->getTicketsList($query, $params);
        
        return $data;

    }

    public function getAssignMe(string $search = "", string $status = ""){

        if($search !== ""){

            $search = "= " . $search;

        }

        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }

        if($status == '0'){
            $status = "";
        }

        $query = "
            SELECT * FROM tb_tickets t
            JOIN tb_status s USING(id_status)
            JOIN tb_priorities pr USING(id_priority)
            JOIN tb_persons p ON p.id_user = t.id_user
            JOIN tb_ticket_assignment ta USING(id_ticket)
            WHERE ta.id_user = :id_user AND t.id_ticket $search AND t.id_status $status
            ORDER BY t.id_ticket DESC
        ";

        $user = new User();
        $user->loadSessionUser();

        $data = $this->getTicketsList($query, [
            ":id_user" => $user->getid_user()
        ]);
        
        return $data;

    }

    public function getNoAssign(string $search = "", string $status = ""){

        if($search !== ""){

            $search = "= " . $search;

        }

        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }

        if($status == '0'){
            $status = "";
        }

        $query = "
            SELECT * FROM tb_tickets t
            JOIN tb_status s USING(id_status)
            JOIN tb_priorities pr USING(id_priority)
            JOIN tb_persons p ON p.id_user = t.id_user
            LEFT JOIN tb_ticket_assignment ta USING(id_ticket)
            WHERE ta.id_user IS NULL AND t.id_ticket $search AND t.id_status $status 
            ORDER BY t.id_ticket DESC
        ";

        
        $data = $this->getTicketsList($query, [
            ":id_user" => (new User)->getid_user()
        ]);
        
        return $data;

    }

    /**
     * 
     * @param object $user Usuário para pegar os tickets.
     * @param string $status Status do ticket.
     * @param string $ticket Id do ticket que quer pegar.
     * 
     * Retorna os dados de todos os tickets, ou de um ticket especifico. 
     * ** SOMENTE PARA USUÁRIOS NORMAIS **
     * 
     */
    public function getTicket( $status = "0", $ticket = null){

        $user = new User();
        $user->loadSessionUser();

        $queryUser = "";

        if( $status !== "0" ){

            $status = " = " . $status;

        }else{
            $status = "";
        }


        if($user){
            
            $queryUser = "= " . $user->getid_user();

        }

     

        if ($ticket !== null) {

            $ticket = ' = ' . $ticket;            

        }

        $dao = new DB();
        $tickets = $dao->exec("
            select t.id_ticket, t.ticket_title, t.ticket_details, t.dt_updates, s.status_name, p.priority_name, t.id_user from tb_tickets t
            join tb_status s using(id_status)
            join tb_priorities p using(id_priority)
            where t.id_user $queryUser AND t.id_status $status AND t.id_ticket $ticket 
            order by t.id_ticket desc
            ;
        "); 

        foreach ($tickets as $row) {
            
            $assign = $dao->exec("
                select p.full_name from tb_ticket_assignment ta
                join tb_users u using(id_user)
                join tb_persons p using(id_user)
                WHERE id_ticket = :idticket;
            ",[
                ":idticket"=>$row['id_ticket']
            ]);

            $data[$row['id_ticket']] = [
                "ticket"=>$row,
                "assignments"=>$assign
            ];
            
        }

 
        if ($ticket !== null) {

            foreach ($tickets as $row) {
            
                $messages = $dao->exec("
                    select tm.id_ticket_message, tm.dt_send, p.full_name, tm.message, tm.id_user from tb_ticket_messages tm
                    join tb_users u using(id_user)
                    join tb_persons p using(id_user)
                    where id_ticket = :idTicket
                    ;
                ",[
                    ":idTicket" => $row['id_ticket']
                ]);
    
                $data[$row['id_ticket']]['messages'] = $messages;
    
            }
            

        }

        return $data;

    }

    /**
     * 
     * Lista de prioridades existentes para um ticket.
     * 
     */
    public function getPriorities(){
        
        $dao = new DB();
        $results = $dao->exec("SELECT * FROM tb_priorities;");

        return $results;

    }

    /**
     * 
     * Lista de status existentes para um ticket.
     * 
     */
    public function getStatus(){

        $dao = new DB();
        $results = $dao->exec("SELECT * FROM tb_status;");

        return $results;

    }

    /**
     * 
     * @param object $user Usuário que vai abrir o ticket.
     * @param array $body Corpo do post enviado para inserir no ticket.
     * 
     * Abre um novo ticket.
     * 
     */
    public function open(){

        $user = new User();
        $user->loadSessionUser();

        $dao = new DB();
        $result = $dao->exec("CALL proc_save_ticket(:pidticket, :piduser, :ptitle, :pdesc, :pidpriority);",[
            ":pidticket"   => 0,
            ":piduser"     => $user->getid_user(),
            ":ptitle"      => $this->gettitle(),
            ":pdesc"       => $this->getdescription(),
            ":pidpriority" => $this->getid_priority()
        ]);


        if(count($result) > 0){

            return $result[0];
        
        }else{
            return ['error'=>true, 'msg'=>'Ocorreu um erro ao abrir o ticket.'];
        }


    }

    /**
     * 
     * @param int $ticketId Id do ticket para inserir mensagem.
     * @param object $user Usuário que vai inserir a mensagem no ticket.
     * @param array $body Corpo da mensagem que sera inserida.
     * 
     * Adiciona uma mensagem a um ticket.
     * 
     */
    public function addMessage($ticketId, $user, $body){

        $dao = new DB();

        $result = $dao->exec("CALL proc_save_message(:pid_ticket, :pid_user, :pmessage)", [
            ":pid_ticket" => $ticketId,
            ":pid_user"   => $user->getid_user(),
            ":pmessage"   => $body['text-new-message']
        ]);

        return $result;

    }

    /**
     * 
     * Retorna os dados da quantidade de tickets para a pagina inicial dos tickets.
     * 
     */
    public function getTicketPageData(){

        $dao = new DB();
        $user = new User();
        $user->loadSessionUser();

        $query = "
            select (

                # Todos os tickets.
                select count(*) from tb_tickets

            ) as 'all', (

                # Tickets atribuidos ao adm.
                select count(*) from tb_tickets t
                join tb_ticket_assignment ta using(id_ticket)
                where ta.id_user = :id_user

            ) as 'assign-me', (

                # Tickets sem atribuição.
                select count(*) from tb_tickets t
                left join tb_ticket_assignment ta using(id_ticket)
                where ta.id_user is null

            ) as 'no-assign';
        ";


        $result = $dao->exec($query, [
            ":id_user" => $user->getid_user()
        ]);

        return $result[0];

    }

    /**
     * 
     *  @param string $query Query customizada que a classe irá executar.
     * 
     * Retorna a lista de tickets de acordo com a query passada.
     * 
     */
    public function getTicketsList(string $query, array $params = []): array{

        $dao = new DB();

        $results = $dao->exec($query, $params);

        return $results;


    }

}

?>