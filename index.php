<?php

    require_once "config.php";

    $app = new \Slim\App;

    $app->get("/", function(){

        echo "Olá mundo. Teste do Slim";

    });

    $app->run();

?>