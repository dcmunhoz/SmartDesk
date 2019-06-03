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
                                <span class="t-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span class="t-attr">Ticket sem atribuição</span>
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
                                <span class="t-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span class="t-attr">Ticket sem atribuição</span>
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
