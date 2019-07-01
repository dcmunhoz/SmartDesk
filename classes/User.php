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

    public static function verifyLogin(){

        \session_start();

        if(!isset($_SESSION[User::SESSION_USER])){

            header("Location: /signin");
            exit;

        }

    }

    public function createUser($body){

        $dao = new DB();
        $result = $dao->exec("CALL proc_save_user(:piduser, :pusername, :pfullname, :ppassw, :pemail, :pactive, :pidprofile);",[
            ":piduser"    => 0,
            ":pusername"  => $body['create-username'],
            ":pfullname"  => $body['create-name'],
            ":ppassw"     => $body['create-pass'],
            ":pemail"     => $body['create-email'],
            ":pactive"    => true,
            ":pidprofile" => 2
        ]);

        return $result[0];

    }

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

    public function logout(){

        \session_start();

        if(isset($_SESSION[User::SESSION_USER])){
            \session_destroy();
        
            header("Location: /");
            exit;
        }
        
    }

    public function getAuthenticatedUser(){

        $idUserAuthenticated = $_SESSION[User::SESSION_USER]['id_user'];

        $dao = new DB();
        $data = $dao->exec("SELECT * FROM tb_users JOIN tb_persons USING(id_user) WHERE id_user = :id_user;", [
            ":id_user" => $idUserAuthenticated
        ]);

        return $data[0];

    }

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
}

?>