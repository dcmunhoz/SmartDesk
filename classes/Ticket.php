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


}

?>