<?php

namespace App;

use App\Model\DB;
use App\Model\ClassModel;
use App\User;

class Ticket extends ClassModel{

    public function __construct(){



    }

    public function getTicket(User $user = null){

        $query = "";

        if($user){
            
            $query = "WHERE id_user = " . $user->getid_user();

        }

        $dao = new DB();
        $tickets = $dao->exec("
            select t.id_ticket, t.ticket_title, t.ticket_details, t.dt_updates, s.status_name, p.priority_name from tb_tickets t
            join tb_status s using(id_status)
            join tb_priorities p using(id_priority)
            $query;
        "); 

        foreach ($tickets as $ticket) {
            
            $assign = $dao->exec("
                select p.full_name from tb_ticket_assignment ta
                join tb_users u using(id_user)
                join tb_persons p using(id_user)
                WHERE id_ticket = :idticket;
            ",[
                ":idticket"=>$ticket['id_ticket']
            ]);

            $data[] = [
                "ticket"=>$ticket,
                "assignments"=>$assign
            ];
            
        }


        return $data;

    }

    public function getPriorities(){
        
        $dao = new DB();
        $results = $dao->exec("SELECT * FROM tb_priorities;");

        return $results;

    }

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

    public function getStatus(){

        $dao = new DB();
        $results = $dao->exec("SELECT * FROM tb_status;");

        return $results;


    }


}

?>