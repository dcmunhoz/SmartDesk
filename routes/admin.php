<?php

    use \App\Model\View as View;

    $app->get("/admin", function(){

        $view = new View(false, false);

        $view->draw("signin-admin");

    });

?>