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

        if(!isset($_SESSION[User::SESSION_USER]) || $_SESSION[User::SESSION_USER] === null){

            header("Location: /signin");

        }

    }





}

?>