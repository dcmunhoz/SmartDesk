<?php

namespace App\Model;

class View {

    private $viewsPath  = "";
    private $configs    = [];

    public function __construct($header = true, $footer = true, $viewsPath = '/views'){

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

        $fullPath = $this->viewsPath . "/" . $pageName . ".php";

        if(\file_exists($fullPath)){
            require($fullPath);
        }else{
            echo "<h1>Page not exists</h1>";
        }
        
    }

    public function __destruct(){

        if($this->configs['footer']){
            $this->draw("footer");
        }

    }

}


?>