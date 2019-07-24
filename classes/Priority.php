<?php
/**
 * 
 * Controller responsavel por gerênciar os setores cadastrados.
 *  
 */

namespace App;

use \App\Model\ClassModel;
use \App\Model\DB;

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


}


?>