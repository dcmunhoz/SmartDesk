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

        $result = $dao->exec("SELECT * FROM tb_sectors JOIN tb_locals USING(id_local) WHERE id_local = :idsector OR sector_name LIKE :name;", [
            ":name" => "%".$search."%",
            ":idsector" => $search
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

        if ($this->getid_sector() >= 1) {

            $data = $this->find($this->getid_sector());

            $oldName  = $data['sector_name'];
            $oldLocal = $data['id_local'];

        }

        if ( $this->getid_sector() == null && (Int) $exists[0]['qtt'] >= 1 || $oldName !== $this->getsector_name() && (Int) $exists[0]['qtt'] >= 1 || $oldLocal !== $this->getid_local() && (Int) $exists[0]['qtt'] >= 1) {

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

    public function find(){

        $dao = new DB();
        $result = $dao->exec("SELECT * FROM tb_sectors JOIN tb_locals USING(id_local) where id_sector = :id_sector", [
            ":id_sector" => $this->getid_sector()
        ]);

        // $this->setData($result[0]);
        return $result[0];

    }

    /**
     * Retorna todos os setores vinculádos a um usuário
     */
    public function getUserSectors(int $idUser): array
    {

        $dao = new DB();

        $user = (new User)->find($idUser);

        $result = $dao->exec("select s.id_sector, s.sector_name from tb_sectors s JOIN tb_persons p USING(id_sector) WHERE p.id_user = :iduser", [
            ":iduser" => $user->getid_user()
        ]);
            
        return $result;


    }


}


?>