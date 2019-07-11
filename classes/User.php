<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com> 
 * 
 * Classe responsavel por gerenciar todo conteudo dos usuários.
 * 
 */

namespace App;

use \App\Model\DB;
use \App\Model\ClassModel;

class User extends ClassModel{

    private const SESSION_USER = "User_Session";

    public function __construct(){

        // Carrega um usuário se existir na sessão;
        \session_start();
        if(isset($_SESSION[User::SESSION_USER])){
            $this->setData($_SESSION[User::SESSION_USER]);
        }

    }

    /**
     * 
     * Verifica se um usuário esta logado.
     * 
     */
    public static function verifyLogin(){

        \session_start();

        if(!isset($_SESSION[User::SESSION_USER])){

            header("Location: /signin");
            exit;

        }

    }

    /**
     * 
     * @param object $body Campos recebidos com os dados do usuário para criar.
     * 
     * Cria um novo usuário no banco de dados.
     * 
     */
    public function createUser($body){

        $dao = new DB();
        $result = $dao->exec("CALL proc_save_user(:piduser, :pusername, :pfullname, :ppassw, :pemail, :pactive, :pidprofile, :pidcompany, :pidplace, :pidsector);",[
            ":piduser"    => 0,
            ":pusername"  => $body['create-username'],
            ":pfullname"  => $body['create-name'],
            ":ppassw"     => $body['create-pass'],
            ":pemail"     => $body['create-email'],
            ":pactive"    => true,
            ":pidprofile" => 2,
            ":pidcompany" => null,
            ":pidplace"   => null,
            ":pidsector"  => null
        ]);

        return $result[0];

    }

    /**
     * 
     * @param object $body Dados de login.
     * 
     * Faz o login do usuário.
     * 
     */
    public function login($body){

        $dao = new DB();
        $result = $dao->exec("SELECT * FROM tb_users WHERE username = :username AND passw = md5(:passw);", [
            ":username" => $body['login-username'],
            ":passw"    => $body['login-pass']
        ]);

        if(isset($result[0]) && count($result[0]) > 0){
            // Usuário existe
            \session_start();
            $_SESSION[User::SESSION_USER] = $result[0];
                        
    
        }else{
            // Usuário não existe.
    
            $error = [
                "error"=>"Usuário ou senha invalidos."
            ];
    
            return $error;
        }

    }

    /**
     * 
     * Faz o logout do usuário.
     * 
     */
    public function logout(){

        \session_start();

        if(isset($_SESSION[User::SESSION_USER])){
            \session_destroy();
        
            header("Location: /");
            exit;
        }
        
    }


    /**
     * 
     * Pega os dados da pessoa autenticada
     * 
     */
    public function getAuthenticatedPerson(){

        $dao = new DB();
        $data = $dao->exec("SELECT * FROM tb_users JOIN tb_persons USING(id_user) WHERE id_user = :id_user;", [
            ":id_user" => $this->getid_user()
        ]);

        return $data[0];

    }

    /**
     * 
     * @param object $body Campos recebidos com os dados do usuário para salvar.
     * 
     * Salva ou altera um usuário.
     * 
     */
    public function save($body){

        $dao = new DB();
        $result = $dao->exec("CALL proc_save_user(:piduser, :pusername, :pfullname, :ppassw, :pemail, :pactive, :pidprofile, :pidcompany, :pidplace, :pidsector);",[
            ":piduser"    => $body['update-user-id'],
            ":pusername"  => $body['update-username'],
            ":pfullname"  => $body['update-full-name'],
            ":ppassw"     => $body['update-pass'],
            ":pemail"     => $body['update-email'],
            ":pactive"    => true,
            ":pidprofile" => 2,
            ":pidcompany" => $body['update-user-company'],
            ":pidplace"   => $body['update-user-place'],
            ":pidsector"  => $body['update-user-sector']
        ]);

        return $result[0];

    }

    /**
     * 
     * Verifica se o usuário logado é administrador.
     * 
     */
    public function isAdmin(){

        $profileId = $this->getid_profile();

        $dao = new DB();

        $result = $dao->exec("SELECT * FROM tb_profiles WHERE id_profile = :idprofile",[
            ":idprofile" => $profileId
        ]);

        return $result[0]['administrator'];

    }
}

?>