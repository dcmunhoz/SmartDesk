<?php
/**
 *  Classe para interagir com o arquivo de configurações  
 */

namespace Source\Utils;

class Config {

    private $configs;

    function __construct(){

        $configFile = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "configs" . DIRECTORY_SEPARATOR . "system.json";

        if (file_exists($configFile)){
            $this->configs = \json_decode(file_get_contents($configFile)); 
        } 
        else {
            var_dump("nada");
        }

    }

    function __get($name){

        return $this->configs->{$name};

    }   

}

?>