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
    
    /**
     * 
     * @param string $idCompany id da empresa para retornar os locais.
     * 
     * Retorna a lista de locais.
     * 
     */
    public function getPlaces(string $idCompany = ""): array{

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_places WHERE id_company = :id_company;",[
            ":id_company"=>$idCompany
        ]);

        return $result;

    }

    /**
     * 
     * @param string $idCompany id da empresa para retornar os setores.
     * 
     * Retorna a lista de setores.
     * 
     */
    public function getSectors(string $idCompany = ""): array{

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_sectors WHERE id_company = :id_company;",[
            ":id_company"=>$idCompany
        ]);

        return $result;

    }

}

?>