/**
 * 
 * Controller que gerencia a pagina de configuração da administração
 * 
 */

// Utilitários & Módulos
const Prototype = require('./../utils/Prototypes');
const User      = require('./../modules/User');

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
                }

            });
        });

    }

    loadUsersList(){

        User.getUserList().then(result=>{

            let tbody = document.querySelector("#table-user-list tbody");
            tbody.innerHTML = "";

            [...result].forEach(row=>{

                let tr = document.createElement('tr');
                tr.dataset.id = row['id_user'];

                let body = `
                <tr>
                    <td>${row['id_user']}</td>
                    <td>${row['full_name']}</td>
                    <td>${row['username']}</td>
                    <td>
                        <div class="option-buttons">
                            <a href=""> <i class="fas fa-edit"></i> </a>
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

}