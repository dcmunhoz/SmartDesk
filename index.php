<?php

    require_once "config.php";
    
    use \App\Model\ClassModel as ClassModel;

    $app = new Slim\App([
        'settings' =>[
            'displayErrorDetails' => true,
        ]
    ]);

    $app->get("/", function(){

        $class = new ClassModel();

        $class->teste();

    });



    $app->run();

?>