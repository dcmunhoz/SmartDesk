<?php

    require_once "config.php";
    
    use \App\Model\ClassModel as ClassModel;
    use \App\Model\View as View;

    $app = new Slim\App([
        'settings' =>[
            'displayErrorDetails' => true,
        ]
    ]);

    require "routes/site.php";
    require "routes/api.php";
    require "routes/admin.php";

    $app->run();

?>