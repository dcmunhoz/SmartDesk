<?php

    
    use \App\Model\View as View;

    $app->get("/", function(){

        $view = new View(false, false);
        $view->draw('login');

    });

    $app->get("/new-user", function(){

        $view = new View(false, false);
        $view->draw("new-user");


    });


?>