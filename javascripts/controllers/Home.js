/**
 * 
 * Controller da pagina principal do usuário.
 * 
 */

 // Utilitários & Modulos.
const Prototype = require('./../utils/Prototypes');
const User = require('./../modules/User');
const Ticket = require('./../modules/Ticket');
const Utils = require('./../utils/Utils');
const Notification = require('./../utils/Notification');

export default class Home {

    constructor(){
        
        Prototype.initElementsPrototypes();
        
        this.verifyUserNeedUpdates();
        this.getUserTickets();
        this.getStatusToOrder();
        this.initEvents();

    }

    /**
     * Inicia os eventos do controlelr.
     */
    initEvents(){

        // Exibe os tickets de acordo com o status selecionado.
        document.querySelector(".search-select-box").on('change', e=>{
            
            let search = e.target.id.split('-')[1];
            let statusId = e.target.value;

            this.getUserTickets(statusId);
            
        });

    }

    // Inicia os eventos do modal de atualização de cadastro.
    initModal(){

        document.querySelector("#btn-modal-update-register-next-page").on('click', e=>{

            let modalMessage = document.querySelector("#confirm-register-message");
            modalMessage.classList.remove('active');
            setTimeout(() => {
                document.querySelector("#modal-user-register").classList.add('expand');
                modalMessage.style.display = 'none';
                
                document.querySelector("#modal-register-confirm").style.display = 'flex';

                setTimeout(()=>{
                    document.querySelector("#modal-register-confirm").classList.add('active');
                }, 1000);

            }, 500);
        });

        document.querySelector("#btn-send-user-register-updates").on('click', e=>{
            
            let formUpdateRegister = document.querySelector("#form-user-confirm-register");
            if(formUpdateRegister.validateFields()){

                // let body = new FormData(formUpdateRegister);
                let body = formUpdateRegister.getBody();
                
                // fetch('/user/update',{
                //     method: "POST",
                //     body
                // }).then(response => {
                //     if(response.ok){

                //         let modalPanel = document.querySelector("#user-complete-register");
                //         modalPanel.classList.remove('active');
                //         setTimeout(()=>{
                //             modalPanel.style.display = 'none';
                //         }, 500);
                //     }
                // });

                fetch('/user/update',{
                    method: "POST",
                    body
                }).then(response => response.json()).then(data => {

                    if (data['error']) {
                        Notification.pop("danger", 'Ooops =[', 'Você alterou seu um usuário para um que já existe.');
                    }else{
                        
                        let modalPanel = document.querySelector("#user-complete-register");
                        modalPanel.classList.remove('active');
                        setTimeout(()=>{
                            modalPanel.style.display = 'none';
                        }, 500);

                    }

                });

            }

        });

        document.querySelector("#update-user-company").on('change', e=>{
            
            document.querySelector("#update-user-place").disabled = false;

            // Locais
            fetch(`/api/company/places`).then(response=>response.json()).then(data=>{

                [...data].forEach(row=>{
                    let option = document.createElement('option');
                    option.value = row['id_local'];
                    option.innerHTML = row['local_name']
                    document.querySelector("#update-user-place").appendChild(option);
                });

            });

        })

        document.querySelector("#update-user-place").on('change', e => {

            document.querySelector("#update-user-sector").disabled = false;

            console.log(e.target.value);
            fetch(`/api/local/${e.target.value}/sectors`).then(response=>response.json()).then(data=>{
                document.querySelector("#update-user-sector").innerHTML = "";
                [...data].forEach(row=>{
                    let option = document.createElement('option');
                    option.value = row['id_sector'];
                    option.innerHTML = row['sector_name']
                    document.querySelector("#update-user-sector").appendChild(option);
                });

            });


        });

    }

    /**
     * Verifica se o usuário precisa fazer atualização cadastral assim que acessa a pagina.
     */
    verifyUserNeedUpdates(){

        User.getData().then(data=>{
            if(data['need_updates'] === "1"){
                let modalPanel = document.createElement('div');
                modalPanel.id = 'user-complete-register';

                let modal = `
                <div id="modal-user-register">
                    <div id="confirm-register-message" style="display:flex;" class="active">
                        <header>
                            <img src="/public/rsc/img/company-logo.png" alt="">
                            <h1>
                                Bem vindo, <span id="update-panel-user-name">Daniel munhoz</span>
                            </h1>
                        </header>
                        <section class="register-message">
                            Como este é seu primeiro login, precisamos que confirme alguns dados para poder dar continuidade na utilização do sistema.
                        </section>
                        <footer>    
                            <button class="btn btn-enviar" id="btn-modal-update-register-next-page">
                                Avançar <i class="fas fa-chevron-right"></i>
                            </button>
                        </footer>
                    </div>
            
                    <div id="modal-register-confirm" style="display:none;" class="">
                        <header>
                            <h1>Atualização de cadastro.</h1>
                        </header>
                        <div class="form-box">
                            <form id="form-user-confirm-register">
                                <input type="hidden" id="update-user-id" name="update-user-id">
                                <input type="hidden" id="update-old-username" name="update-old-username">
                                <div class="form-group" >
                                    <label for="update-full-name">Nome:</label>
                                    <input type="text" id="update-full-name" name="update-full-name" placeholder="Seu nome completo">
                                </div>
                
                                <div class="form-group" >
                                    <label for="update-username">Usuário</label>
                                    <input type="text" id="update-username" name="update-username" placeholder="Seu usuário">
                                </div>
            
                                <div class="form-group" >
                                    <label for="update-email">E-mail:</label>
                                    <input type="text"  id="update-email" name="update-email" placeholder="Ex: smart@desk.com">
                                </div>
            
                                <div class="row row-2">
            
                                    <div class="form-group">
                                        <label for="update-user-company">Empresa:</label>
                                        <select name="update-user-company" id="update-user-company">
                                            <option value="0">--</option>
                                        </select>
                                    </div>
            
                                    <div class="form-group">
                                        <label for="update-user-place">Local atuação:</label>
                                        <select name="update-user-place" id="update-user-place" disabled>
                                            <option value="0">--</option>
                                        </select>
                                    </div>
            
                                </div>
            
                                <div class="form-group">
                                    <label for="update-user-sector">Setor:</label>
                                    <select name="update-user-sector" id="update-user-sector" disabled>
                                        <option value="0">--</option>                            
                                    </select>
                                </div>
            
                            </form>
                        </div>
                        <footer>
                            <button class="btn btn-enviar" id="btn-send-user-register-updates">
                                <i class="fas fa-check"></i> <b>Confirmar</b>
                            </button>
                        </footer>
                    </div>
                </div>
                
                `;


                setTimeout(()=>{
                    modalPanel.style.display = 'flex';
                    setTimeout(()=>{
                        modalPanel.classList.add('active');
                    }, 100);
                }, 1000);

                modalPanel.innerHTML = modal;
                document.querySelector('#app').appendChild(modalPanel);
                this.initModal();

                document.querySelector("#update-full-name").value = data['full_name'];
                document.querySelector("#update-username").value = data['username'];
                document.querySelector("#update-old-username").value = data['username'];
                document.querySelector("#update-email").value = data['email'];
                document.querySelector("#update-user-id").value = data['id_user'];
                document.querySelector("#update-panel-user-name").innerHTML = User.getUserName(data);

                fetch('/api/company').then(response => response.json()).then(data=>{

                    [...data].forEach(row=>{
                        let option = document.createElement('option');
                        option.value = row['id_company'];
                        option.innerHTML = row['company_name']
                        document.querySelector("#update-user-company").appendChild(option);
                    });                            

                });



            }
        });

    }

    /**
     * 
     * @param {int} statusId Id do status a ser pego.
     * 
     * Pega os dados do ticket. Case o id não seja informado, retorna todos os tickets.
     *  
     */
    getUserTickets(statusId = 1){

        User.getTicketList(statusId).then(tickets=>{
            let tbody = document.querySelector("#tickets-list tbody");
            tbody.innerHTML = "";

            Object.values(tickets).reverse().forEach(data=>{
                
                let tr = document.createElement("tr");
                tr.dataset.ticket = data['ticket'].id_ticket;

                let dtUpdate = Utils.dateFormat(new Date(data['ticket'].dt_updates));

                let assign = "Atribuido para: ";

                if(data['assignments'].length >= 1){
                    
                    data['assignments'].map(assignment=>{

                        assign += `<i>${assignment.full_name}</i>`;

                    });

                }else{

                    assign = "Ticket sem atribuição.";

                }      

                let done = "";
                if (data['ticket']['status_name'] !== "Aberto") {
                    done = 'done';
                } else {
                    done = 'open';
                }

                tr.innerHTML = `
                    <td>
                        <div class="ticket-row-details">
                            <div class="img-status">
                                <img src="public/rsc/img/ticket-${done}.png" alt="#">
                            </div>
                            <div class="tr-body">
                                <h2>Ticket #${data['ticket'].id_ticket} [${data['ticket']['status_name']}]</h2>
                                <span class="t-title">${data['ticket'].ticket_title}</span>
                                <span class="t-attr">${assign}</span>
                            </div>
                        </div>
                    </td>
                    <td>${data['ticket'].priority_name}</td>
                    <td>${dtUpdate}</td>
                `;

                tbody.appendChild(tr);

            });

            
            this.initTrEvents();

        }).catch(reject=>{                
            let tbody = document.querySelector("#tickets-list tbody");
            tbody.innerHTML = "";
            let tr = document.createElement("tr");
            
            tr.classList.add('no-tickets');

            let inner = `

                <td colspan="3">... ${reject.msg}.</td>
   
            `;

            tr.innerHTML = inner;

            tbody.appendChild(tr);

        });

    }

    /**
     * Pega os status existentes para ordenar os tickets
     * 
     */
    getStatusToOrder(){

        Ticket.getStatus().then(data=>{
            data.map(status=>{

                    let select = document.querySelector("#select-status");
                    let option = document.createElement('option');
                    option.value = status.id_status;
                    option.innerHTML = status.status_name;

                    if (status['id_status'] == 1) {
                        option.selected = true;
                    }

                    select.appendChild(option);

            });
        });

    }

    /**
     * Inicia os eventos na linha do ticket
     */
    initTrEvents(){

        document.querySelectorAll("#tickets-list tbody tr").forEach(tr=>{

            tr.on('click', e=>{

                let ticketId = tr.dataset.ticket;

                window.location.replace(`/ticket/${ticketId}/details`);

            });

        });

    }
}
