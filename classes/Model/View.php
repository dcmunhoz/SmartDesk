<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com> 
 * 
 * Classe responsavel por renderizar as views do sistema.
 * 
 */

namespace App\Model;

class View {

    private $viewsPath  = "";
    private $configs    = [];

    /**
     * @param bool $header Renderizar o header.
     * @param bool $footer Renderizar o footer.
     * @param string $viewsPath Caminho para as views.
     * 
     */
    public function __construct($header = true, $footer = true, $viewsPath = 'views/'){

        $this->viewsPath = $viewsPath;
        $this->configs = [
            'header'=>$header,
            'footer'=>$footer
        ];
        
        if($this->configs['header']){
            $this->draw('header');
        }
        
    }

    /**
     * @param string $pageName Nome da pagina que deseja renderizar.
     * 
     * Renderiza uma pagina especifica para o usuário.
     */
    public function draw($pageName){

        if(file_exists($this->viewsPath . $pageName . ".php")){

            require($this->viewsPath . $pageName . ".php");

        }else{

            if(file_exists($this->viewsPath . $pageName . ".html")){

                require($this->viewsPath . $pageName . ".html");

            }else{

                echo "<h1> Page not exists ! </h1>";

            }
        }
        
    }

    public function __destruct(){

        if($this->configs['footer']){
            $this->draw("footer");
        }

    }

}


?>