<div class="system-options">
    <nav class="nav nav-track">
        <ul>
            <li class="nav-button ">
                <button>Painel</button>
            </li>
            <li class="nav-button active">
                <button>Abrir Ticket</button>
            </li>
            <li class="nav-button">
                <button>Colaboradores</button>
            </li>
        </ul>
    </nav>
    <section class="panel"> 
        <header>
            <h1>Novo Ticket</h1>
        </header>
        <div class="open-ticket-panel">
            <form action="#" method="#">
                <div class="row row-2">
                    <div class="form-group">
                        <label for="ticket-title">Titulo do ticket:</label>
                        <input type="text" name="ticket-title" id="ticket-title" class="dark" placeholder="Breve descrição do problema.">
                    </div>

                    <div class="form-group">
                        <label for="ticket-priority">Prioridade:</label>
                        <select name="ticket-priority" id="ticket-priority" class="dark">
                            <option value="">Prioridade</option>
                            <option value="">Prioridade</option>
                            <option value="">Prioridade</option>
                            <option value="">Prioridade</option>
                            <option value="">Prioridade</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="ticket-desc">Descrição do ticket:</label>
                        <textarea name="ticket-desc" id="ticket-desc" class="dark" placeholder="Descreva aqui o ocorrido detalhadamente..." cols="1" rows="10" ></textarea>
                    </div>
                </div>

                <footer class="form-footer">
                    <button class="btn btn-ok">Enviar Ticket</button>
                </footer>

            </form>
        </div>
                        
    </section>
</div>