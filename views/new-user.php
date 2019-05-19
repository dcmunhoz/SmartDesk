<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="public/rsc/css/style.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/elements.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/mq.css" rel="stylesheet" type="text/css">

        <title>Cadastro - Informe seus dados para criar um usuário</title>
    </head>
    
    <body>
        <main id="app">
            <div class="container">
                <header>
                    <h1>Smart Desk</h1>
                </header>
                <section class="box">
                    <div class="form-box">
                        <img src="public/rsc/imgs/company-logo.png" alt="Company Logo">
                        <p class="description">Digite seus dados para cadastrar um novo usuário</p>
                        <form action="" method="POST">
                            <div class="form-group">
                                <label for="create-name">Nome:</label>
                                <input type="text" id="create-name" name="create-name" placeholder="Seu nome completo.">
                            </div>

                            <div class="form-group">
                                <label for="create-username">Usuário:</label>
                                <input type="text" id="create-username" name="create-username" placeholder="Seu usuário para acesso.">
                            </div>

                            <div class="form-group">
                                <label for="create-email">E-mail:</label>
                                <input type="text" id="create-email" name="create-email" placeholder="seu@email.com">
                            </div>

                            <div class="form-group">
                                <label for="create-pass">Senha:</label>
                                <input type="text" id="create-pass" name="create-pass" placeholder="Sua senha de no minimo 6 caracteres.">
                            </div>

                            <div class="form-group">
                                <label for="create-confirm-pass">Confirmar Senha:</label>
                                <input type="text" id="create-confirm-pass" name="create-confirm-pass" placeholder="Confirme sua senha.">
                            </div>

                            <button class="btn btn-login">Criar nova conta</button>
                            
                        </form>
                        <div class="redirect-links">
                            <p><a href="/helpdesk">Clique para entrar !</a></p>
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