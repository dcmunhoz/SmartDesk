<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 *
 * Classe contendo metodos padrões modelos para todas as outras classes do sistema.
 *  
 */

namespace App\Model;

class ClassModel {

    // Propriedades da classe
    private $props = [];


    /**
     * @param string $name Nome do metodo chamado.
     * @param array $args Parametros passados para a função.
     * 
     * Método magico que captura o nome da função chamada.
     * Será utilizado para criar os getters e setters dinamicamente.
     */
    public function __call($name, $args){

        $method    = \substr($name, 0, 3);
        $fieldName = \substr($name, 3, \strlen($name)); 
        
        switch ($method) {
            //Metodo GET, retorna uma propriedade especifica.
            case 'get':
                return (isset($this->props[$fieldName]) ? $this->props[$fieldName] : null);
            break;

            //Metodo SET, carrega uma propriedade especifica.
            case 'set':
                $this->props[$fieldName] = $args[0];
            break;

        }

    }

    /**
     * @param array $args Array com os dados a serem carregados na clases.
     * 
     * Carrega um array de dados na classe
     */
    public function setData($args){
        foreach ($args as $key => $value) {
            $this->{"set$key"}($value);
        }
    }

    /**
     * 
     * Retorna todos os dados das propriedades da classe.
     * 
     */
    public function getData(){
        return $this->props;
    }

}

?>