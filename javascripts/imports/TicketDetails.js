const Ticket = require('./../modules/Ticket');
const Utils = require('./../utils/Utils');
const Prototype = require('./../utils/Prototypes');
const Notification = require('../utils/Notification');

export default class TicketDetails {

    constructor(){
        
        Prototype.initElementsPrototypes();
        this.loadTicketDetails();
        this.initEvents();

    }

    initEvents(){

        document.querySelectorAll(".show-panel").forEach(btn=>{
            btn.on("click", e=>{
            
                this.switchPanel(btn.dataset.target);
                
            });
        });

        document.querySelector("#btn-new-message").on('click', e=>{
            
            let form = document.querySelector('#form-send-new-message');
            if(form.validateFields()){

                let formData = new FormData(form);
                let ticketId = document.querySelector("#ticket-id").innerHTML;
                
                Ticket.addMessage(ticketId, formData).then(success=>{
                    
                    this.loadTicketDetails();
                    form.clear();
                    Notification.pop("success", "Sucesso", "Sua mensagem foi enviada.");

                    
                }).catch(fail=>{
                    console.log(fail);
                });



            }

        });

    }

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

    loadTicketDetails(){

        let ticketId = window.location.pathname.split('/')[2];

        Ticket.get(ticketId).then(data=>{

            // Detalhes
            document.querySelector("#ticket-title").value = data['ticket']['ticket_title'];
            document.querySelector("#ticket-priority").value = data['ticket']['priority_name'];
            document.querySelector("#ticket-update").value = data['ticket']['dt_updates'].split(" ")[0];
            document.querySelector("#ticket-desc").value = data['ticket']['ticket_details'];
            document.querySelector("#ticket-id").innerHTML = data['ticket']['id_ticket'];
            
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


                if(messageData['id_user'] !== ticket['id_user']){
                    message.classList.add("out");
                }

                message.innerHTML = `
                    <div class="message-body">
                        <section class="ticket-message">
                            ${messageData['message']}
                        </section>
                        <footer>
                            ${messageData['full_name']} ás ${time} de ${data}
                        </footer>
                    </div>
                `

                messagesBox.appendChild(message);
            });

        }).catch(fail=>{
            

        });

    }

}