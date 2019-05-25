<?php

    
    use \App\Model\View as View;

    $app->get("/", function(){

        $view = new View(false, false);
        $view->draw("user-panel");

    });

    $app->get("/signin", function(){

        $view = new View(false, false);
        $view->draw('signin');

    });

    $app->get("/signup", function(){

        $view = new View(false, false);
        $view->draw("signup");


    });


?>