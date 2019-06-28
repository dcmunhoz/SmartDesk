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

        if(!isset($_SESSION[User::SESSION_USER]) || $_SESSION[User::SESSION_USER] === null){

            header("Location: /signin");

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

        if(count($result[0]) > 0 ){
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
}

?>