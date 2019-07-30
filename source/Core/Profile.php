<?php
/**
 * 
 * Classe responsavel por gerenciar um perfil.
 * 
 */

namespace Source\Core;

use \Source\Model\CLassModel;
use \Source\Model\DB;

class Profile extends ClassModel{

    /**
     * Retorn a lista de perfis cadastrados.
     */
    public function getProfiles(){
        
        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_profiles;");

        return $result;

    }

}

?>