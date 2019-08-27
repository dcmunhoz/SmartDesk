
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

         [...data].forEach(user => {

            const optionClaimer = document.createElement("option");
            
           optionClaimer.id = user['id_user'];
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

         [...data].forEach(priority => {

            const optionPriority = document.createElement("option");
            optionPriority.id = priority['id_priority'];
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

      this._ticket['assignments'].forEach(user => {

      let li = document.createElement('li');
      li.dataset.idUser = user['id_user'];

      li.innerHTML = `
         <span><a href="" class="btn-remove-assign"><i class="fas fa-times-circle" title="Remover"></i></a></span>
         <span>${user['full_name']}</span>
      `;

      ul.appendChild(li);

      });
      
      // this.loadListEvents();

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

         [...data].forEach(user => {

            let option = document.createElement('option');
            option.dataset.idUser = user['id_user'];
            option.innerHTML = user['full_name'];

            select.appendChild(option);

         });

      });

   }

 }