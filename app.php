<?php

    
    use \App\Model\View as View;

    $app->get("/", function(){

        $view = new View(false, false);
        $view->draw('index');

    });


?>