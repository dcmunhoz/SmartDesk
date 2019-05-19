<?php

namespace App\Model;

class View {

    private $viewsPath  = "";
    private $configs    = [];

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