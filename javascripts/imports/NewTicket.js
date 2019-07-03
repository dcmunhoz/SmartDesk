const Prototype = require('./../utils/Prototypes');
const Ticket    = require('./../modules/Ticket');
const Notification = require('./../utils/Notification');

export default class NewTicket {

    constructor(){

        Prototype.initElementsPrototypes();
        this.initEvents();
        this.getPriorities();
    }


    initEvents(){

        document.querySelector("#btn-open-new-ticket").on('click', e=>{
            e.preventDefault();
            
            let frmNewTicket = document.querySelector('#form-open-new-ticket');
            
            if(frmNewTicket.validateFields()){
                
                let frmData = new FormData(frmNewTicket);

                Ticket.open(frmData).then(data=>{

                    frmNewTicket.clear();

                    Notification.pop('success', `Ticket #${data.id_ticket}`, `Ticket aberto, logo um técnico irá entrar em contato.`);
                    
                    
                }).catch(error=>{
                    
                    Notification.pop('danger', `Error`, `${error.msg}`);
                    
                });

            }

        });

    }

    getPriorities(){

        Ticket.getPriorities().then(data=>{

            let select = document.querySelector("#ticket-priority");
            data.map(row=>{

                let option = document.createElement('option');
                option.value = row.id_priority;
                option.innerHTML = row.priority_name;
                
                select.appendChild(option);
            });



        }).catch(reject=>{

        });


    }

}