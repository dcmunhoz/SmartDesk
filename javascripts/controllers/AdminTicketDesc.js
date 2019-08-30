
/**
 * Controller pagina descrição de ticket
 */

 // Utilitários e módulos
 const Prototype = require('../utils/Prototypes');
 const Notification = require('../utils/Notification');
 const Util = require('../utils/Utils');
 const Ticket = require('../modules/Ticket');
 const User   = require('../modules/User');
 const Priority = require('../modules/Priority');

 export default class AdminTicketDesc {

    constructor() {
      this._ticket = [];

      Prototype.initElementsPrototypes();

      this.loadTicketData();
      this.initEvents();

    }

    initEvents(){

      document.querySelector('#btn-new-message').on('click', e => {

         let message = document.querySelector("#ticket-desc").value;

         if (message.trim() !== "") {

            let body = new FormData();
            body.append('text-new-message', message);

            Ticket.addMessage(this._ticket['id_ticket'], body).then(data => {

               Notification.pop("success", "Ticket atualizado", "Mensagem inserida com sucesso");
               
               this.loadTicketData();
               document.querySelector("#ticket-desc").value = "";

            });

         }  else {

            alert("Informe uma mensagem antes de enviar.");

         }
         

      });

      document.querySelector('#btn-done').on('click', e => {

         Ticket.end(this._ticket['id_ticket']).then(data => {

            Notification.pop("success", "Ticket finalizado", "O Ticket foi finalizado com sucesso.");
            this.loadTicketData();


         }).catch(error => {
            
            Notification.pop("danger", "Ooooops !", "Ticket já finalizado");

         });

      });

      document.querySelector("#btn-update").on('click', e => {


         this._ticket['id_user']     = document.querySelector("#user-claimer").value;
         this._ticket['id_priority'] = document.querySelector("#ticket-priority").value;

         let body = new FormData();

         body.append('id_ticket', this._ticket['id_ticket']);
         body.append('user-request', this._ticket['id_user']);
         body.append('ticket-priority', this._ticket['id_priority']);
         body.append('ticket-title', this._ticket['ticket_title']);
         body.append('ticket-details', this._ticket['ticket_details']);

         Ticket.open(body).then(data => {

            Notification.pop("success", "Alteração realizada", "O ticket foi alterado.");
            this.loadTicketData();

         });
         
      });

      document.querySelector("#btn-assign-me").on('click', e => {
         e.preventDefault();

         Ticket.assign(this._ticket['id_ticket']).then(data => {

            Notification.pop("success", "Sucesso", "Ticket atribuido a você");
            this.loadTicketData();
            
         }).catch(error => {
            
            Notification.pop("danger", "Ooops", "Ticket já atribuido a você");
         });

      });

      document.querySelector("#btn-new-assign").on('click', e => {

         e.preventDefault();

         let idUserAssign = document.querySelector("#user-assign").value;

         Ticket.assign(this._ticket['id_ticket'], idUserAssign).then(data => {
            
            Notification.pop("success", "Sucesso", "O ticket foi atribuido ao usuário");
            this.loadTicketData();
            
         }).catch(error => {
            
            Notification.pop("danger", "Oooops", "O ticket já foi atribuido ao usuário");
            console.clear();

         });

      });

    }

    loadTicketData(){

      let ticketId = window.location.href.split('/')[window.location.href.split('/').length - 1];

      Ticket.getTicektDetails(ticketId).then(data=>{

         this._ticket = data;

         // Requerente
         this.loadClaimers();

         // Tecnicos
         this.loadTeam();

         // Atribuições
         this.listAssignmentUsers();

         // Prioridade
         this.loadPriorities();         

         // Titulo ticket
         let innerTitle = `[# ${this._ticket['id_ticket']}][<span id="ticket-status" style="">${this._ticket['status_name']}</span>] ${this._ticket['ticket_title']} `;
         document.querySelector("#ticket-title").innerHTML = innerTitle;

         // Mensagens
         this.loadMessages();

      });
      

    }

    loadClaimers(){

      User.getUserList().then(data=>{
         const selectClaimer = document.querySelector("#user-claimer");
         selectClaimer.innerHTML = "";

         [...data].forEach(user => {

            const optionClaimer = document.createElement("option");
            
           optionClaimer.value = user['id_user'];
           optionClaimer.innerHTML = user['full_name'];

            if(this._ticket['id_user'] == user['id_user']){

               optionClaimer.selected = true;

            }

           selectClaimer.appendChild(optionClaimer);

         });

      });

    }

    loadPriorities(){
       
      Priority.getPriorities().then(data => {

         const selectPriority = document.querySelector("#ticket-priority");
         selectPriority.innerHTML = "";

         [...data].forEach(priority => {

            const optionPriority = document.createElement("option");
            optionPriority.value = priority['id_priority'];
            optionPriority.innerHTML = priority['priority_name'];

            if ( this._ticket['id_priority'] == priority['id_priority'] ) {

               optionPriority.selected = true;

            }

            selectPriority.appendChild(optionPriority);

         });

      });

    }

   /**
   * Exibe na <ul> os usuário atribuidos
   */
   listAssignmentUsers(){

      const ul = document.querySelector("#assign-users");
      ul.innerHTML = "";

      if (this._ticket['assignments'] !== null) {

         this._ticket['assignments'].forEach(user => {

            let li = document.createElement('li');
            li.dataset.idUser = user['id_user'];
   
            li.innerHTML = `
               <span><a href="" class="btn-remove-assign" data-id-user="${user['id_user']}"><i class="fas fa-times-circle" title="Remover"></i></a></span>
               <span>${user['full_name']}</span>
            `;
   
            ul.appendChild(li);
   
         });

      }
      
      this.loadListEvents();

   }

   loadListEvents(){

      document.querySelectorAll(".btn-remove-assign").forEach(li => {

         li.on('click', e=>{
            e.preventDefault();

            let idUser = li.dataset.idUser;

            Ticket.unassign(this._ticket['id_ticket'], idUser).then(data => {

               Notification.pop("success", "Atribuição removida", "A atribuição foi removida com sucesso.");

               this.loadTicketData();
               
            });

         });

      });

   }

   loadMessages(){

      const messageBox = document.querySelector("#messages-box");
      messageBox.innerHTML = "";

      this._ticket['messages'].forEach(message => {

         const messageRow = document.createElement('div');
         messageRow.classList.add('message-row');
         if (message['id_user'] != this._ticket['id_user']) {
            messageRow.classList.add('out')
         }

         let date = Util.dateFormat(new Date(message['dt_send']));
         let time = Util.timeFormat(new Date(message['dt_send']));
         
         messageRow.innerHTML = `
            <div class="message-body">
               <section class="ticket-message">
                  ${message['message']}
               </section>
               <footer>
                  ${message['full_name']} ás ${time} de ${date}
               </footer>
            </div>
         `;

         messageBox.appendChild(messageRow);

      });

   }

   /**
    * Carrega a lista de tecnicos
    */
   loadTeam(){

      User.getTeam().then(data => {

         let select = document.querySelector("#user-assign");
         select.innerHTML = "";

         [...data].forEach(user => {

            let option = document.createElement('option');
            option.value = user['id_user'];
            option.innerHTML = user['full_name'];

            select.appendChild(option);

         });

      });

   }

 }