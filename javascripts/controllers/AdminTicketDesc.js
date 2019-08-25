/**
 * Controller pagina descrição de ticket
 */

 // Utilitários e módulos
 const Ticket = require('../modules/Ticket');

 export default class AdminTicketDesc {

    constructor() {

      this.loadTicketData();

    }

    loadTicketData(){

      let ticketId = window.location.href.split('/')[window.location.href.split('/').length - 1];

      Ticket.getTicektDetails(ticketId).then(data=>{

         // Requerente
         console.log(data);

      });
      

    }

 }