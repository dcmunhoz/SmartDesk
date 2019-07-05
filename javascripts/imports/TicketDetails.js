const Ticket = require('./../modules/Ticket');

export default class TicketDetails {

    constructor(){
        
        this.loadTicketDetails();
        
    }

    loadTicketDetails(){

        let ticketId = window.location.pathname.split('/')[2];

        Ticket.get(ticketId).then(data=>{

            console.log(data['assignments'])

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
            console.log("fail", fail);

        });

    }

}