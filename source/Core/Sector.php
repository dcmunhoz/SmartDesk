<?php
/**
 * 
 * Controller responsavel por gerênciar os setores cadastrados.
 *  
 */

namespace Source\Core;

use \Source\Model\ClassModel;
use \Source\Model\DB;

class Sector extends ClassModel{

    public function __construct(){



    }

    /**
     * 
     * @param string $search setor a ser pesquisado.
     * 
     * Retorna a lista de setores cadastrados.
     * 
     */
    public function getSectors(string $search = null): array{

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_sectors WHERE sector_name LIKE :name;", [
            ":name" => "%".$search."%"
        ]);

        return $result;

    }
    
    /**
     * 
     * Retorna a quantidade de setores cadastradas.
     * 
     */
    public function getQuantity(): array{

        $dao = new DB();

        $result = $dao->exec("SELECT COUNT(*) AS 'qtde' FROM tb_sectors;");

        return $result[0];

    }


}


?>