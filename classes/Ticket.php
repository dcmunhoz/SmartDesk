<?php
/**
 *  @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 *  Classe responsavel por controlar as ações do ticket.
 * 
 */

namespace App;

use App\Model\DB;
use App\Model\ClassModel;
use App\User;

class Ticket extends ClassModel{

    public function __construct(){



    }

    /**
     * 
     * @param object $user Usuário para pegar os tickets.
     * @param string $status Status do ticket.
     * @param string $ticket Id do ticket que quer pegar.
     * 
     * Retorna os dados de todos os tickets, ou de um ticket especifico. 
     * Se o usuário for informado, pega o ticket somente dele, caso contrario retorna de todos os usuários(Para ADM).
     * 
     */
    public function getTicket(User $user = null, $status = "0", $ticket = null){

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
    public function open(User $user, $body){

        $dao = new DB();
        $result = $dao->exec("CALL proc_save_ticket(:pidticket, :piduser, :ptitle, :pdesc, :pidpriority);",[
            ":pidticket"   => 0,
            ":piduser"     => $user->getid_user(),
            ":ptitle"      => $body['ticket-title'],
            ":pdesc"       => $body['ticket-desc'],
            ":pidpriority" => $body['ticket-priority']
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

}

?>