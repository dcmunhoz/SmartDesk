/**
 * 
 * Controller que gerencia a pagina geral de tickets.
 * 
 */

// Utilitários & Módulos
const Prototype = require('./../utils/Prototypes');
const Ticket    = require('./../modules/Ticket');

export default class AdminTickets{

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();

    }

    initEvents(){

        document.querySelectorAll(".btn-switch-panel").forEach(btn=>{
            
            btn.on('click', e=>{
                

                let target = btn.dataset.target;

                this.switchPanel(target);

            });

        });


    }

    switchPanel(target){
        this.disablePanels();
        document.querySelector(`#tickets-${target}`).classList.add('panel-active');

    }

    disablePanels(){
        document.querySelectorAll(".target-panel").forEach(panel=>{

            panel.classList.remove('panel-active');

        });
    }

}