<?php
/**
 * 
 * Controller responsavel por gerênciar os locais cadastrados.
 *  
 */

namespace Source\Core;

use \Source\Model\ClassModel;
use \Source\Model\DB;

class Local extends ClassModel{

    public function __construct(){



    }

    /**
     * 
     * @param string $search local a ser pesquisado.
     * 
     * Retorna a lista de locais cadastrados.
     * 
     */
    public function getLocals(string $search = null): array{

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_places WHERE local_name LIKE :name;", [
            ":name" => "%".$search."%"
        ]);

        return $result;

    }
    
    /**
     * 
     * Retorna a quantidade de locais cadastradas.
     * 
     */
    public function getQuantity(): array{

        $dao = new DB();

        $result = $dao->exec("SELECT COUNT(*) AS 'qtde' FROM tb_places;");

        return $result[0];

    }


}


?>