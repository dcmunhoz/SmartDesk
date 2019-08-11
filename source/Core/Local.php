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

        $result = $dao->exec("SELECT * FROM tb_locals JOIN tb_cities USING(id_city) WHERE local_name LIKE :name;", [
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

        $result = $dao->exec("SELECT COUNT(*) AS 'qtde' FROM tb_locals;");

        return $result[0];

    }

    /**
     * 
     *  Salva um local no banco de dados.
     * 
     */
    public function save(): array{

        $dao = new DB();

        $exists = $dao->exec("SELECT count(*) as 'qtt' FROM tb_locals WHERE local_name = :local_name", [
            ":local_name" => $this->getlocal_name()
        ]);

        if((Int) $exists['qtt'] > 0){

            return [
                "error" => true,
                "message" => "O local informado já existe."
            ];

        }

        $result = $dao->exec("CALL proc_save_local(:pidlocal, :plocalname, :pidcompany, :pcitycep, :pcityname)", [
            ":pidlocal"   => $this->getid_local(),
            ":plocalname" => $this->getlocal_name(),
            ":pidcompany" => (Int) $this->getid_company(),
            ":pcitycep"   => (Int) $this->getcity_cep(),
            ":pcityname"  => $this->getcity_name()
        ]);

        return $result;

    }

    public function find() {

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_locals JOIN tb_cities USING(id_city) WHERE id_local = :id_local", [
            ":id_local" => $this->getid_local()
        ]);

        $this->setData($result[0]);
    }


}


?>