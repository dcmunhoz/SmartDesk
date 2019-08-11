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

    public function save(){

        $dao = new DB();

        $exists = $dao->exec("SELECT COUNT(*) as 'qtt' FROM tb_sectors WHERE sector_name = :sector_name AND id_local = :id_local", [
            ":sector_name" => $this->getsector_name(),
            ":id_local"    => $this->getid_local()
        ]);

        if ((Int) $exists[0]['qtt'] > 0) {

            return [ 
                'error' => true,
                'message' => 'Setor já cadastrado no sistema.'
            ];

        }

        $result = $dao->exec("CALL proc_save_sector(:pidsector, :psectorname, :pidlocal)",[
            ":pidsector"   => $this->getid_sector(),
            ":psectorname" => $this->getsector_name(),
            ":pidlocal"    => $this->getid_local()
        ]);

        return $result;

    }


}


?>