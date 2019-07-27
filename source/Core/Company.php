<?php
/**
 * 
 * Classe responsavel por gerenciar uma empresa.
 * 
 */

namespace Source\Core;

use \Source\Model\CLassModel;
use \Source\Model\DB;

class Company extends ClassModel{

    /**
     * 
     * @param String $search Empresa a ser pesquisada.
     * 
     * Retorna a lista das empresas.
     * 
     */
    public function getCompanies(String $search = null): array{

        $dao = new DB();

        $results = $dao->exec("SELECT * FROM tb_companies WHERE company_name like :search;",[
            ":search"=>"%".$search."%"
        ]);
        
        return $results;

    }

    /**
     * 
     * Retorna a quantidade de empresas cadastradas.
     * 
     */
    public function getQuantity(): array{

        $dao = new DB();

        $result = $dao->exec("SELECT COUNT(*) AS 'qtde' FROM tb_companies;");

        return $result[0];

    }

}

?>