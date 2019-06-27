<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com> 
 * 
 * Classe responsavel por gerenciar conexões com o banco de dados.
 * 
 */

namespace App\Model;

class DB{

    private $conn;

    /**
     * Construtor da classe.
     * 
     */
    public function __construct(){

        // Verifica se o arquivo de configuração do banco existe.
        if(\file_exists("configs/database.config")){

            // Pega os dados do arquivo, e insere nas varaiveis
            $file =  file("configs/database.config");

            $host     = trim(\explode("=", $file[0])[1]);
            $database = trim(\explode("=", $file[1])[1]);
            $user     = trim(\explode("=", $file[2])[1]);
            $pass     = trim(\explode("=", $file[3])[1]);

            try{

                // Cria a conexão com o banco de dados.
                $this->conn = new \PDO("mysql:host=". $host .";dbname=". $database .";charset=utf8", $user, $pass);
                $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            }catch(Exception $e){

                throw new Exception($e->message, 1);

            } 

        }

    }

    /**
     * 
     * @param string $stmt Statement da conexão com o banco.
     * @param array $param Parametros da consulta do banco.
     * 
     * Binda os parametros.
     * 
     */
    public function setParams($stmt, $params = []){

        foreach($params as $key => $value){

            $this->bindParam($stmt, $key, $value);


        }

    }

    public function bindParam($stmt, $key, $value){
        
        $stmt->bindParam($key, $value);

    }

    /**
     * 
     * @param string $query String com a consulta do banco.
     * @param array $param Parametros da consulta do banco.
     * 
     * Executa um comando sem retorno do banco de dados.
     * 
     */
    public function query($query, $params = []){

        $stmt = $this->conn->prepare($query);
        $this->setParams($stmt, $params);

        $stmt->execute();

    }

    /**
     * 
     * @param string $query String com a consulta do banco.
     * @param array $param Parametros da consulta do banco.
     * 
     * Executa um comando com retorno do banco de dados.
     * 
     */
    public function exec($query, $params = []){

        try{
            $stmt = $this->conn->prepare($query);
            $this->setParams($stmt, $params);

            $stmt->execute();

            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    
        }catch(Exception $e){

            throw new Exception($e->getMessage(), 1);
        

        }
    

    }


}   

?>