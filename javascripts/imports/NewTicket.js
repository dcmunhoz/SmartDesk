const Prototype = require('./../utils/Prototypes');
const Ticket    = require('./../modules/Ticket');

export default class NewTicket {

    constructor(){

        Prototype.initElementsPrototypes();
        this.initEvents();
        this.getPriorities();
    }


    initEvents(){

    }

    getPriorities(){

        Ticket.getPriorities().then(data=>{

            let select = document.querySelector("#ticket-priority");
            data.map(row=>{

                console.log(row);

                let option = document.createElement('option');
                option.value = row.id_priority;
                option.innerHTML = row.priority_name;
                
                select.appendChild(option);
            });



        }).catch(reject=>{

        });


    }

}