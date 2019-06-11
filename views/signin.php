<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link href="public/rsc/css/style.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/elements.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/mq.css" rel="stylesheet" type="text/css">

        <title>Login - Entre para continuar</title>
    </head>
    
    <body>
        <main id="app">
            <div class="container">
                <header>
                    <h1>Smart Desk</h1>
                </header>
                <section class="box">
                    <div class="form-box">
                        <img src="public/rsc/img/company-logo.png" alt="Company Logo">
                        <p class="description">Entre com seu usuário e senha para solicitar um suporte técnico.</p>
                        <form action="" method="POST">
                            <div class="form-group">
                                <label for="login-username">Usuário:</label>
                                <input type="text" id="login-username" name="login-username" placeholder="Seu usuário de acesso.">
                            </div>

                            <div class="form-group">
                                <label for="login-pass">Senha:</label>
                                <input type="text" id="login-pass" name="login-pass" placeholder="Sua senha de no minimo 6 caracteres">
                            </div>

                            <button class="btn btn-enviar">Entrar</button>
                            
                        </form>
                        <div class="redirect-links">
                            <p><a href="/helpdesk/admin">Entrar como técnico. </a></p>
                            <p>Ainda não tem uma conta? <a href="/helpdesk/new-user">Clique aqui!</a></p>
                        </div>

                    </div>
                
                </section>
            </div>
            <div class="system-welcome">
                
                <h1>Bem vindo ao Smart Desk</h1>
                <p>Software para gestão de Ordem de Serviço</p>

            </div>


        </main>
        <script src="public/rsc/js/script.js"></script>
    </body>


</html>