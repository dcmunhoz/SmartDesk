const Ticket = require('./../modules/Ticket');

export default class TicketDetails {

    constructor(){
        
        this.loadTicketDetails();
        
    }

    loadTicketDetails(){

        let ticketId = window.location.pathname.split('/')[2];

        Ticket.get(ticketId).then(data=>{

            //Continuar aqui: Inserir os dados do ticket.

        }).catch(fail=>{
            console.log("fail", fail);

        });

    }

}