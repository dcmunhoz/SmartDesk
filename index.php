<?php

    require_once "config.php";
    
    use \App\Model\ClassModel as ClassModel;
    use \App\Model\View as View;

    $app = new Slim\App([
        'settings' =>[
            'displayErrorDetails' => true,
        ]
    ]);

    require "app.php";
    require "api.php";

    $app->run();

?>