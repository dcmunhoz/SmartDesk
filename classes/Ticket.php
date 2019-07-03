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
        $result = $dao->exec("SELECT * FROM tb_tickets $query"); 

        return $result;

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
            return ['error'=>true, 'msg'=>'Ocorreu um erro ao abrir o ticket, tente novamente'];
        }


    }


}

?>