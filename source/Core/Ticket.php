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

        $dao = new DB();
        
        if($search !== ""){
            
            $search = "= " . $search;
            
        }
        
        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }
        
        if($status == '0'){
            $status = "";
        }

        $user =  new User();

        $user->loadSessionUser();

        $idUser = $user->getid_user();
        
        $query = "
        SELECT *, (SELECT count(*) FROM tb_ticket_assignment ta WHERE ta.id_ticket = t.id_ticket and ta.id_user = :iduser) AS 'assign' FROM tb_tickets t
        JOIN tb_status s USING(id_status)
        JOIN tb_priorities pr USING(id_priority)
        JOIN tb_persons p ON p.id_user = t.id_user
        WHERE t.id_ticket $search AND t.id_status $status
        ORDER BY t.id_ticket DESC
        ";
        
        $params = [
            ":iduser" => $user->getid_user()
        ];

        $data = $this->getTicketsList($query, $params);

        foreach ($data as $key => $value) {
            
            $assignQuery = $dao->exec("SELECT ta.id_ticket_assignment, p.full_name FROM tb_ticket_assignment ta JOIN tb_users u USING(id_user) JOIN tb_persons p USING (id_user) WHERE ta.id_ticket = :id_ticket ORDER BY ta.id_ticket_assignment", [
                ":id_ticket" => $data[$key]['id_ticket']
            ]);

            
            if (count($assignQuery) > 1) {
                
                $assign = $assignQuery[0]['full_name'] . ", +" . (count($assignQuery)-1);
                
            } else if(count($assignQuery) == 1) {
                
                $assign = $assignQuery[0]['full_name'];
                
            }else { 
                $assign = "-"; 
            }

            $data[$key]['assignments'] = $assign;
            
        }
        
        return $data;

    }

    public function getAssignMe(string $search = "", string $status = ""){

        $dao = new DB();

        if($search !== ""){

            $search = "= " . $search;

        }

        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }

        if($status == '0'){
            $status = "";
        }

        $user =  new User();

        $user->loadSessionUser();

        $query = "
            SELECT *, (SELECT count(*) FROM tb_ticket_assignment ta WHERE ta.id_ticket = t.id_ticket and ta.id_user = :id_user) AS 'assign' FROM tb_tickets t
            JOIN tb_status s USING(id_status)
            JOIN tb_priorities pr USING(id_priority)
            JOIN tb_persons p ON p.id_user = t.id_user
            JOIN tb_ticket_assignment ta USING(id_ticket)
            WHERE ta.id_user = :id_user AND t.id_ticket $search AND t.id_status $status
            ORDER BY t.id_ticket DESC
        ";


        $data = $this->getTicketsList($query, [
            ":id_user" => $user->getid_user()
        ]);
    
        foreach ($data as $key => $value) {
            
            $assignQuery = $dao->exec("SELECT ta.id_ticket_assignment, p.full_name FROM tb_ticket_assignment ta JOIN tb_users u USING(id_user) JOIN tb_persons p USING (id_user) WHERE ta.id_ticket = :id_ticket ORDER BY ta.id_ticket_assignment", [
                ":id_ticket" => $data[$key]['id_ticket']
            ]);
            
            if (count($assignQuery) > 1) {
                
                $assign = $assignQuery[0]['full_name'] . ", +" . (count($assignQuery)-1);
                
            } else if(count($assignQuery) == 1) {
                
                $assign = $assignQuery[0]['full_name'];
                
            }else { 
                $assign = "-"; 
            }

            $data[$key]['assignments'] = $assign;
            
        }

        return $data;

    }

    public function getNoAssign(string $search = "", string $status = ""){

        $dao = new DB();

        if($search !== ""){

            $search = "= " . $search;

        }

        if($status !== "" && $status !== "0"){
            
            $status = "= " . $status;
        }

        if($status == '0'){
            $status = "";
        }

        $user =  new User();

        $user->loadSessionUser();

        $query = "
            SELECT *, (SELECT count(*) FROM tb_ticket_assignment ta WHERE ta.id_ticket = t.id_ticket and ta.id_user = :id_user) AS 'assign' FROM tb_tickets t
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

        foreach ($data as $key => $value) {
            
            $assignQuery = $dao->exec("SELECT ta.id_ticket_assignment, p.full_name FROM tb_ticket_assignment ta JOIN tb_users u USING(id_user) JOIN tb_persons p USING (id_user) WHERE ta.id_ticket = :id_ticket ORDER BY ta.id_ticket_assignment", [
                ":id_ticket" => $data[$key]['id_ticket']
            ]);
            
            if (count($assignQuery) > 1) {
                
                $assign = $assignQuery[0]['full_name'] . ", +" . (count($assignQuery)-1);
                
            } else if(count($assignQuery) == 1) {
                
                $assign = $assignQuery[0]['full_name'];
                
            }else { 
                $assign = "-"; 
            }

            $data[$key]['assignments'] = $assign;
            
        }
        
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

        if ($this->getid_appl() > 0) {
            $user->find($this->getid_appl());
        }else{
            $user->loadSessionUser();
        }

        
        
        $dao = new DB();
        $result = $dao->exec("CALL proc_save_ticket(:pidticket, :piduser, :ptitle, :pdesc, :pidpriority);",[
            ":pidticket"   => $this->getid_ticket(),
            ":piduser"     => $user->getid_user(),
            ":ptitle"      => $this->gettitle(),
            ":pdesc"       => $this->getdescription(),
            ":pidpriority" => $this->getid_priority()
        ]);
            
            
        if(count($result) > 0){

            $this->setData($result[0]);
            $assignments = $this->getassignments();
    
            if (count($assignments) >= 1) {
    
                foreach ($assignments as $assign) { 
                    
                    $this->assign($assign->id_user);
    
                }
    
            }

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
                select count(*) from tb_tickets where id_status = 1

            ) as 'all', (

                # Tickets atribuidos ao adm.
                select count(*) from tb_tickets t
                join tb_ticket_assignment ta using(id_ticket)
                where ta.id_user = :id_user and id_status = 1

            ) as 'assign-me', (

                # Tickets sem atribuição.
                select count(*) from tb_tickets t
                left join tb_ticket_assignment ta using(id_ticket)
                where ta.id_user is null and id_status = 1

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

    public function assign($idUser = null){

        $user = new User();
        $dao = new DB();

        if($idUser){

            $user->find($idUser);

        }else{

            $user->loadSessionUser();

        }

        $result = $dao->exec("SELECT COUNT(*) AS 'qtt' FROM tb_ticket_assignment WHERE id_ticket = :idTicket AND id_user = :idUser;", [
            ":idTicket" => $this->getid_ticket(),
            ":idUser"   => $user->getid_user()
        ]);

        if ((Int) $result[0]['qtt'] >= 1) {

            return [
                "error" => true,
                "message" => "Ticket já atribuido."
            ];

        }

        $dao->query("INSERT INTO tb_ticket_assignment(id_ticket, id_user) VALUES(:idTicket, :idUser);", [
            ":idTicket" => $this->getid_ticket(),
            ":idUser"   => $user->getid_user()
        ]);

        return true;


    }

    public function unassign($idUser){

        $dao = new DB();

        $dao->query("DELETE FROM tb_ticket_assignment WHERE id_ticket = :idTicket AND id_user = :idUser", [
            ":idTicket" => $this->getid_ticket(),
            ":idUser" => $idUser
        ]);
    }

    public function find(string $ticketId){

        $dao = new DB();

        // Ticket
        $ticket = $dao->exec("
            SELECT * FROM tb_tickets t 
            JOIN tb_status s USING(id_status) 
            JOIN tb_priorities p USING(id_priority)
            JOIN tb_persons pr USING(id_user)
            WHERE t.id_ticket = :id_ticket
        ", [
            ":id_ticket" => $ticketId
        ])[0];

        // Assignments
        $assignments = $dao->exec("
            SELECT * FROM tb_ticket_assignment ta
            JOIN tb_persons p USING(id_user)
            WHERE ta.id_ticket = :id_ticket
        ", [ 
            ":id_ticket" => $ticketId
        ]);

        if(count($assignments) >= 1){

            foreach ($assignments as $assign) {
                $ticket['assignments'][] = $assign;
            }

        }else{

            $ticket['assignments'] = null;

        }

        // Messages
        $messages = $dao->exec("
            SELECT * FROM tb_ticket_messages tm
            JOIN tb_persons p USING(id_user)
            WHERE tm.id_ticket = :id_ticket
            ORDER BY tm.id_ticket_message asc
        ", [
            ":id_ticket" => $ticketId
        ]);

        if (count($messages) >= 1) {

            foreach ($messages as $message) {

                $ticket['messages'][] = $message;

            }

        }else{

            $ticket['messages'] = null;

        }


        $this->setData($ticket);

    }

    public function end(){

        $dao = new DB();

        if ($this->getid_status() == 4) {
            return false;
        }

        $dao->query("UPDATE tb_tickets SET id_status = 4 WHERE id_ticket = {$this->getid_ticket()};");
        return true;
    }

}

?>