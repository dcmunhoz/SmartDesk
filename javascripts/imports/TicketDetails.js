const Ticket = require('./../modules/Ticket');

export default class TicketDetails {

    constructor(){
        
        this.loadTicketDetails();
        this.initEvents();

    }

    initEvents(){

        document.querySelectorAll(".show-panel").forEach(btn=>{
            btn.on("click", e=>{
            
                this.switchPanel(btn.dataset.target);
                
            });
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

    hideAllPanels(){

        

    }

    loadTicketDetails(){

        let ticketId = window.location.pathname.split('/')[2];

        Ticket.get(ticketId).then(data=>{

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

        }).catch(fail=>{
            

        });

    }

}