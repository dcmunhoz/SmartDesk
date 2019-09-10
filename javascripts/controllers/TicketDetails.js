/**
 * 
 * Controler tela visualização de ticket.
 * 
 */

 // Utilitários & Módulos.
const Ticket = require('./../modules/Ticket');
const Utils = require('./../utils/Utils');
const Prototype = require('./../utils/Prototypes');
const Notification = require('../utils/Notification');

export default class TicketDetails {

    constructor(){
        
        this._ticket;

        Prototype.initElementsPrototypes();
        this.loadTicketDetails();
        this.initEvents();

    }

    // Inicia os eventos do controller.
    initEvents(){

        // Troca o painel de exibição (Geral, mensagens).
        document.querySelectorAll(".show-panel").forEach(btn=>{
            btn.on("click", e=>{
            
                this.switchPanel(btn.dataset.target);
                
            });
        });

    }

    loadMessageEvent(){

        // Adiciona uma nova mensagem ao ticket.
        document.querySelector("#btn-new-message").on('click', e=>{
            
            let form = document.querySelector('#form-send-new-message');
            if(form.validateFields()){

                // let formData = new FormData(form);
                let body = form.getBody();
                let ticketId = document.querySelector("#ticket-id").innerHTML;
                
                Ticket.addMessage(ticketId, body).then(success=>{
                    
                    this.loadTicketDetails();
                    form.clear();
                    Notification.pop("success", "Sucesso", "Sua mensagem foi enviada.");

                    
                }).catch(fail=>{
                    
                });



            }

        });
    }

    loadSolutionButtons() {

        // Reprovar solução
        document.querySelector("#btn-reprove-solution").on('click', e => {
    
            let message = document.querySelector('#text-new-message').value;

            if(message.trim() !== ''){

                Ticket.reprove(this._ticket['id_ticket'], message).then(data=>{

                    Notification.pop('success', 'Solução Rejeitada', 'A solução foi rejeitada.');
                    document.querySelector('#text-new-message').value = "";
                    this.loadTicketDetails();

                });

            }else{
                Notification.pop('danger', 'Ooops !', 'Informe uma mensagem para rejeitar a solução');
                document.querySelector('#text-new-message').parentNode.classList.add('input-error');
            }

        });

        // Aprova uma solução
        document.querySelector("#btn-aprove-solution").on('click', e => {

            Ticket.aprove(this._ticket['id_ticket']).then(data => {

                Notification.pop("success", "Ticket aprovado =D", "Você aprovou a solução com sucesso =D");
                document.querySelector('#text-new-message').value = "";
                this.loadTicketDetails();

            });

        });

    }

    /**
     * 
     * @param {string} panelName Nome do painel a ser exibido.
     * 
     * Desativa todos os painel possiveis e exibe somente o informado.
     * 
     */
    switchPanel(panelName){
        document.querySelectorAll(".panel").forEach(panel=>{
            panel.classList.remove('active')
        });
        document.querySelectorAll(".show-panel").forEach(btn=>{
            btn.classList.remove("active");
        });


        
        document.querySelector(`#${panelName}-panel`).classList.add("active");
        document.querySelector(`#show-panel-${panelName}`).classList.add("active");
    }

    /**
     * Carrega na tela os detalhes do ticket.
     */
    loadTicketDetails(){

        let ticketId = window.location.pathname.split('/')[2];

        Ticket.get(ticketId).then(data=>{

             this._ticket = data['ticket'];

            // Detalhes
            document.querySelector("#ticket-title").value = data['ticket']['ticket_title'];
            document.querySelector("#ticket-priority").value = data['ticket']['priority_name'];
            document.querySelector("#ticket-update").value = data['ticket']['dt_updates'].split(" ")[0];
            document.querySelector("#ticket-desc").value = data['ticket']['ticket_details'];
            document.querySelector("#ticket-id").innerHTML = data['ticket']['id_ticket'];
            document.querySelector("#ticket-status").innerHTML = `[${data['ticket']['status_name']}]`;
            
            if(data['assignments'].length >= 1){
                
                [...data['assignments']].forEach(assign=>{
                    document.querySelector("#ticket-atr").innerHTML = `${assign['full_name']}, `;
                })

            }else{
                
                document.querySelector("#ticket-atr").innerHTML = 'Sem atribuição.';
            }

            let ticket = data['ticket'];
            let messagesBox = document.querySelector("#messages-box");
            messagesBox.innerHTML = "";

            // Acompanhamentos.
            [...data['messages']].forEach(messageData=>{

                let data = Utils.dateFormat(new Date(messageData['dt_send']));
                let time = Utils.timeFormat(new Date(messageData['dt_send']));

                let message = document.createElement('div');
                message.classList.add("message-row");


                // if(messageData['id_user'] !== ticket['id_user']){
                //     message.classList.add("out");
                // }

                let type = "";
                switch (messageData['message_type']) {
                   case 'M':
                      type = "Acompanhamento";
                   break;
                   case 'S':
                      type = "Solução"
                      message.classList.add("solved");
                   break;
                   case 'R':
                      type = "Rejeição";
                   break;
                }

                message.innerHTML = `
                    <div class="message-body">
                        <header>
                        <div class="header-user"> 
                            <span class="user-name">${messageData['full_name']}</span>  &lt;${messageData['email']}&gt; 
                        </div>
                        </header>
                        <section class="ticket-message">
                        ${messageData['message']}
                        </section>
                        <footer>
                        ${type} - ás ${time} de ${data}
                        </footer>
                    </div>
                `

                messagesBox.appendChild(message);
            });


            // Adiciona botões para aprovar ou recusar solução
            let idStatus = data['ticket']['id_status'];

            console.log(idStatus);

            // Solucionado
            if (idStatus == 4) {

                document.querySelector(".message-buttons").innerHTML = `
                    <button type="sumbit" id="btn-aprove-solution"  class="btn btn-done"><i class="fas fa-check"></i> Aprovar solução</button>
                    <button type="sumbit" id="btn-reprove-solution" class="btn btn-danger"><i class="fas fa-times"></i> Reprovar solução</button>
                `;

                this.loadSolutionButtons();

            } else if (idStatus != 5){ 
                document.querySelector(".message-buttons").innerHTML = `
                    <button type="submit" id="btn-new-message" class="btn btn-ok"><i class="far fa-file-alt"></i> Novo Acompanhamento</button>
                `;
                this.loadMessageEvent();
            } else {

                document.querySelector(".message-buttons").innerHTML = "";

            }

        }).catch(fail=>{
            

        });

    }

}