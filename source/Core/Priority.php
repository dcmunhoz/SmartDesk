<?php
/**
 * 
 * Controller responsavel por gerênciar os setores cadastrados.
 *  
 */

namespace Source\Core;

use \Source\Model\ClassModel;
use \Source\Model\DB;

class Priority extends ClassModel{

    public function __construct(){



    }

    /**
     * 
     * @param string $search prioridade a ser pesquisada.
     * 
     * Retorna a lista de prioridades cadastradas.
     * 
     */
    public function getPriorities(string $search = null): array{

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_priorities WHERE priority_name LIKE :name;", [
            ":name" => "%".$search."%"
        ]);

        return $result;

    }

    public function save(){

        $dao =  new DB();

        $exists = $dao->exec("SELECT COUNT(*) as 'qtt' FROM tb_priorities WHERE priority_name = :pname", [
            ":pname" => $this->getpriority_name()
        ]);

        if ((Int) $exists[0]['qtt'] >= 1) {
            
            return [
                "error" => true,
                "message" => "Prioridade já cadastrada"
            ];
        }

        $result = $dao->exec("CALL proc_save_priority(:pidpriority, :ppriorityname, :pprioritycolor)", [
            ":pidpriority"    => $this->getid_priority(),
            ":ppriorityname"  => $this->getpriority_name(),
            ":pprioritycolor" => $this->getpriority_color()    
        ]);



        return $result[0];

    }


}


?>