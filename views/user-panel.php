<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link href="public/rsc/css/style.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/elements.css" rel="stylesheet" type="text/css">
        <link href="public/rsc/css/mq.css" rel="stylesheet" type="text/css">
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <title>Bem Vindo - Painel de chamados</title>

    </head>
    
    <body>
        <main id="app">
            <section id="user-container">
                <nav class="nav-bar">
                    <div class="logo-container">
                        <img src="public/rsc/imgs/company-logo.png" alt="Company logo">
                    </div>
                    <div class="user-options-container">
                        <ul class="user-menu">
                            <li>
                                <i class="material-icons md-24">search</i>
                            </li>
                            <li>
                                <img src="public/rsc/imgs/no_user.png" alt="">
                            </li>
                            
                        </ul>
                    </div>
                </nav>

                <div id="page-container">
                    <div id="content">
                        <div class="background">
                            <div class="background-title">
                                <h1>Bem vindo ao Smart Desk</h1>
                            </div>
                        </div>

                        <div class="content-body">
                            <div class="system-description">
                                <p>Este é um software de gerenciamento de ordens de serviço.</p>
                                <p>Aqui você vai pode criar e acompanhar todas os seus tickets abertos. </p>
                                <p>Após a abertura, um dos técnicos cadastrados vão assumir os tickets e entrar em contato com você para solucionar os problemas.</p>
                            </div>
                            <div class="system-options">
                                <nav class="nav nav-track">
                                    <ul>
                                        <li class="nav-button active">
                                            <button>Painel</button>
                                        </li>
                                        <li class="nav-button">
                                            <button>Abrir Ticket</button>
                                        </li>
                                        <li class="nav-button">
                                            <button>Colaboradores</button>
                                        </li>
                                    </ul>
                                </nav>
                                <section class="panel">
                                    <header>
                                        <h1>Seus Tickets</h1>
                                    </header>
                                    <table class="tickets-table">
                                        <caption class="search-select-fields">
                                            <div class="form-group">
                                                <label for="select-priority">Status:</label>
                                                <select name="select-priority" id="select-priority" class="search-select-box">
                                                    <option value="">test</option>
                                                    <option value="">test2</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="select-order">Ordernar por:</label>
                                                <select name="select-order" id="select-order" class="search-select-box">
                                                    <option value="">test2</option>
                                                    <option value="">test1</option>
                                                </select>
                                            </div>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th>Descrição</th>
                                                <th>Prioridade</th>
                                                <th>Ultima interação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="ticket-row-details">
                                                        <div class="img-status">
                                                            <img src="public/rsc/imgs/ticket-open.png" alt="#">
                                                        </div>
                                                        <div class="tr-body">
                                                            <h2>Ticket #2058</h2>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                            <p>Ticket sem atribuição</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>cccccccccccccccc</td>
                                                <td>23/05/2019 16:40</td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div class="ticket-row-details">
                                                        <div class="img-status">
                                                            <img src="public/rsc/imgs/ticket-done_2.png" alt="#">
                                                        </div>
                                                        <div class="tr-body">
                                                            <h2>Ticket #2058</h2>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                            <p>Ticket sem atribuição</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>cccccccccccccccc</td>
                                                <td>1234dddddddddddd</td>
                                            </tr>

                                        </tbody>
                                        
                                    </table>

                                </section>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </main>
        <script src="public/rsc/js/script.js"></script>
    </body>


</html>