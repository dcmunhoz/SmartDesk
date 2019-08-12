/**
 * 
 * Controller que gerencia a pagina de configuração da administração
 * 
 */

// Utilitários & Módulos
const Prototype = require('./../utils/Prototypes');
const User      = require('./../modules/User');
const Company   = require('./../modules/Company');
const Locals    = require('./../modules/Locals');
const Sector    = require('./../modules/Sector');
const Priority    = require('./../modules/Priority');

export default class AdminConfigs {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        
    }

    initEvents(){

        // Troca os paineis
        document.querySelectorAll(".button-panel").forEach(btn=>{
            btn.on('click', e=>{

                // Painel alvo.
                let target = btn.dataset.target;
                
                // Desativa todos os paineis.
                this.disablePanels();

                // Ativa o painel alvo e deixa o botão ativado.
                document.querySelector(`#${target}-panel`).classList.add("panel-active");
                btn.classList.add('active');

                // Carrega a lista que foi selecionada.
                switch(target){
                    case 'users':
                        this.loadUsersList();
                    break;
                    case 'companies':
                        this.loadCompaniesList();
                    break;
                    case 'locals':
                        this.loadLocalsList();
                    break;
                    case 'sectors':
                        this.loadSectorsList();
                    break;
                    case 'priorities':
                        this.loadPrioritiesList();
                    break;
                }

            });
        });

    }

    /**
     * Eventos da tela de configuração do usuário.
     */
    initUserConfigEvents(){

        document.querySelector("#search-user").on('keyup', e=>{

            this.getUsers(e.target.value);

        });

    }

    /**
     * Eventos da tela de configuração de empresas.
     */
    initCompaniesConfigEvents(){

        document.querySelector("#search-company").on('keyup', e=>{
        
            this.getCompanies(e.target.value);
            
        });

    }

    /**
     * Eventos da tela de configuração de locais.
     */
    initLocalsEvents(){

        document.querySelector("#search-local").on('keyup', e=>{

            this.getLocals(e.target.value);

        });

    }

    /**
     * Eventos da tela de configuração de setores.
     */
    initSectorsEvents(){

        document.querySelector("#search-sector").on('keyup', e=>{

            this.getSectors(e.target.value);

        });

    }

    /**
     * Eventos da tela de configuração de prioridades.
     */
    initSectorsEvents(){

        document.querySelector("#search-priority").on('keyup', e=>{

            this.getPriorities(e.target.value);

        });

    }

    initPrioritiesEvents(){

        
    }

    /**
     * Carrega a lista de usuários
     */
    loadUsersList(){

        // Lista de usuários
        this.getUsers();

        // Quantidade de usuários.
        User.getUserQtd().then(result=>{

            document.querySelector("#users-count").innerHTML = result['qtde'];

        });

        this.initUserConfigEvents();

    }

    /**
     * Carrega as companias.
     */
    loadCompaniesList(){

        // Lista de Empresas.
        this.getCompanies();

        // Quantidade de empresas cadastradas.
        Company.getQuantity().then(result=>{

            document.querySelector("#companies-quantity").innerHTML = result['qtde'];

        });

        this.initCompaniesConfigEvents();

    }

    /**
     * Carrega a lista de locais.
     */
    loadLocalsList(){

        // Lista
        this.getLocals();

        // Quantidade
        Locals.getQuantity().then(result=>{

            document.querySelector("#locals-quantity").innerHTML = result['qtde'];

        });

        
        this.initLocalsEvents();

    }

    /**
     * Carrega a lista de setores.
     */
    loadSectorsList(){

            // Lista
            this.getSectors();

            // Quantidade
            Sector.getQuantity().then(result=>{
    
                document.querySelector("#sectors-quantity").innerHTML = result['qtde'];
    
            });
    
            
            this.initSectorsEvents();
    }

        /**
     * Carrega a lista de Priotidade.
     */
    loadPrioritiesList(){

        // Lista
        this.getPriorities();

        // Quantidade
        // Priority.getQuantity().then(result=>{

        //     document.querySelector("#priorities-quantity").innerHTML = result['qtde'];

        // });

        
        this.initPrioritiesEvents();
}

    /**
     * Desativa todos os paineis e botões (Remove a classe 'active' e 'panel-active'). 
     */
    disablePanels(){

        // Paineis
        document.querySelectorAll(`.config-panel`).forEach(panel=>{
            panel.classList.remove('panel-active');
        });

        // Botões 
        document.querySelectorAll(`.button-panel`).forEach(button=>{
            button.classList.remove('active');
        });


    }

    /**
     * 
     * @param {string} search Usuário pesquisado.
     * 
     * Retorna a lsita de usuários.
     *  
     */
    getUsers(search){
        User.getUserList(search).then(result=>{

            let tbody = document.querySelector("#table-user-list tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement('tr');
                tr.dataset.id = row['id_user'];

                let body = `
                    <td>${row['id_user']}</td>
                    <td>${row['full_name']}</td>
                    <td>${row['username']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href="/admin/user/${row['id_user']}"> <i class="fas fa-edit"></i> </a>
                        </div>
                    </td>
                `;

                tr.innerHTML = body;
                tbody.appendChild(tr);
                
            });

        });

    }

    /**
     * 
     * @param {String} search Empresa pesquisada.
     * 
     * Retorna a lista de empresas.
     * 
     */
    getCompanies(search){

        Company.getCompanies(search).then(result=>{

            let tbody = document.querySelector("#table-companies-list tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement("tr");
                tr.dataset.id = row['id_company'];

                let body = `
                <tr>
                    <td>${row['id_company']}</td>
                    <td>${row['company_name']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href="/admin/company/${row['id_company']}"> <i class="fas fa-edit"></i> </a>
                        </div>
                    </td>
                </tr>
                `;

                tr.innerHTML = body;
                tbody.appendChild(tr);

            });

        });

    }

    /**
     * 
     * @param {String} search Local pesquisado.
     * 
     * Retorna a lista dos locais.
     *  
     */
    getLocals(search){

        Locals.getLocals(search).then(result=>{

            
            let tbody = document.querySelector("#table-list-locals tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement('tr');
                tr.dataset.id = row['id_local'];

                let body = `
                    <td>${row['id_local']}</td>
                    <td>${row['local_name']}</td>
                    <td>${row['city_name']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href="/admin/place/${row['id_local']}"> <i class="fas fa-edit"></i> </a>
                        </div>
                    </td>
                `;

                tr.innerHTML = body;

                tbody.appendChild(tr);

            });

        });

    }

    /**
     * 
     * @param {String} search setor pesquisado.
     * 
     * Retorna a lista dos setores.
     *  
     */
    getSectors(search){

        Sector.getSectors(search).then(result=>{

            
            let tbody = document.querySelector("#table-list-sectors tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement('tr');
                tr.dataset.id = row['id_sector'];

                let body = `
                    <td>${row['id_sector']}</td>
                    <td>${row['sector_name']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href="/admin/sector/${row['id_sector']}"> <i class="fas fa-edit"></i> </a>
                        </div>
                    </td>
                `;

                tr.innerHTML = body;

                tbody.appendChild(tr);

            });

        });

    }

        /**
     * 
     * @param {String} search prioridade pesquisado.
     * 
     * Retorna a lista das prioridades.
     *  
     */
    getPriorities(search){

        Priority.getPriorities(search).then(result=>{

            
            let tbody = document.querySelector("#table-list-priorities tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement('tr');
                tr.dataset.id = row['id_priority'];

                let body = `
                    <td>${row['id_priority']}</td>
                    <td>${row['priority_name']}</td>
                    <td style="color:${row['priority_color']};">${row['priority_color']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href="/admin/priority/4"> <i class="fas fa-edit"></i> </a>
                        </div>
                    </td>
                `;

                tr.innerHTML = body;

                tbody.appendChild(tr);

            });

        });

    }

}