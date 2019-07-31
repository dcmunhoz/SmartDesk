<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com> 
 * 
 * Classe responsavel por gerenciar todo conteudo dos usuários.
 * 
 */

namespace Source\Core;

use Source\Model\DB;
use Source\Model\ClassModel;

class User extends ClassModel{

    private const SESSION_USER = "User_Session";

    public function __construct(){



    }

    /**
     * Carrega o usuário da sessão
     */
    public function loadSessionUser(){

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
    public static function verifyLogin($adminRoute = false){

        \session_start();

        if(!isset($_SESSION[User::SESSION_USER])){

            header("Location: /signin");
            exit;

        }

        if($adminRoute){
            
            if( !$_SESSION[User::SESSION_USER]['administrator'] ){

                \session_destroy();

                header("Location: /signin");
                exit;

            }

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
        $result = $dao->exec("SELECT * FROM tb_users u JOIN tb_profiles p USING(id_profile) WHERE u.username = :username AND u.passw = md5(:passw);", [
            ":username" => $body['username'],
            ":passw"    => $body['passw']
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
     * Salva ou altera um usuário.
     * 
     */
    public function save(){
        
        $dao = new DB();
        
                
        $exist = $dao->exec("SELECT count(*) as 'qtt' FROM tb_users WHERE username like :username",[
            ":username"=>$this->getusername()
        ]);

        if( \is_null($this->getid_user()) && (Int) $exist[0]['qtt'] >= 1 ){

            return [
                "error"=> true,
                "message"=> "Usuário já cadastrado no sistema."
            ];

        }    

        $result = $dao->exec("CALL proc_save_user(:piduser, :pusername, :pfullname, :ppassw, :pemail, :pactive, :pidprofile, :pidcompany, :pidplace, :pidsector);",[
            ":piduser"    => $this->getid_user(),
            ":pusername"  => $this->getusername(),
            ":pfullname"  => $this->getfull_name(),
            ":ppassw"     => $this->getpassw(),
            ":pemail"     => $this->getemail(),
            ":pactive"    => $this->getuser_active(),
            ":pidprofile" => $this->getid_profile(),
            ":pidcompany" => $this->getid_company(),
            ":pidplace"   => $this->getid_place(),
            ":pidsector"  => $this->getid_sector()
        ]);

        $this->setData($result[0]);

        return $this->getData();               

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

    /**
     * Lista os usuários cadastrados
     */
    public function listUsers($search = null){

        $dao = new DB();

        $results = $dao->exec("SELECT u.id_user, u.username, p.full_name FROM tb_users u JOIN tb_persons p USING(id_user) WHERE p.full_name like :search OR u.username like :search ORDER BY p.full_name; ", [
            ":search"=>"%".$search."%"
        ]);

        return $results;

    }

    /**
     * Retorna a quantidade de usuários cadastrados
     */
    public function getQtd(){

        $dao = new DB();
        $resut = $dao->exec("SELECT COUNT(*) AS 'qtde' FROM tb_users;");

        return $resut[0];

    }
}

?>