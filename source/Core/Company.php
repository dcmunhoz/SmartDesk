<?php
/**
 * 
 * Classe responsavel por gerenciar uma empresa.
 * 
 */

namespace Source\Core;

use Source\Model\CLassModel;
use Source\Model\DB;

class Company extends ClassModel{

    /**
     * 
     * Retorna os dados de uma empresa
     * 
     */
    public function find(int $idCompany){

        $dao = new DB();

        $result= $dao->exec("SELECT * FROM tb_companies WHERE id_company = :id_company ", [
            ":id_company" => $idCompany
        ]);

        $this->setData($result[0]);
    }

    /**
     * 
     * Salva uma nova empresa no banco.
     * 
     */
    public function save(){

        $dao = new DB();

        $exist = $dao->exec("SELECT count(*) as 'qtt' FROM tb_companies WHERE company_name = :name",[
            ":name" => $this->getcompany_name()
        ]);

        if((Int) $exist[0]['qtt'] > 0){

            return [
                'error'   => true,
                'message' => "Empresa já cadastrada."
            ];

        }

        $result = $dao->exec("CALL proc_save_company(:pidcompany, :pname)",[
            ":pidcompany" => $this->getid_company(),
            ":pname"      => $this->getcompany_name()
        ]);

        $this->setData($result[0]);

        return $this->getData();

    }

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