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
        this.loadInitialDatas();
        this.loadAllTicketsList();

    }

    initEvents(){

        document.querySelectorAll(".btn-switch-panel").forEach(btn=>{
            
            btn.on('click', e=>{
                

                let target = btn.dataset.target;

                this.switchPanel(target);
                switch(target){
                    case 'all':
                        this.loadAllTicketsList();
                }

            });

        });


    }

    /**
     * 
     * @param {String} target Nome do painel para exibir.
     * 
     * Exibe o painel de tickets selecionado para o usuário.
     *  
     */
    switchPanel(target){
        this.disablePanels();
        document.querySelector(`#tickets-${target}`).classList.add('panel-active');

    }

    /**
     * Desativa todos os paineis de ticket.
     */
    disablePanels(){
        document.querySelectorAll(".target-panel").forEach(panel=>{

            panel.classList.remove('panel-active');

        });
    }


    loadInitialDatas(){

        Ticket.getPageData().then(result=>{

            document.querySelector("#all-tickets-button-qtt").innerHTML = result['all'];
            document.querySelector("#assign-me-tickets-button-qtt").innerHTML = result['assign-me'];
            document.querySelector("#no-assign-tickets-button-qtt").innerHTML = result['no-assign'];
            document.querySelector("#all-tickets-panel-qtt").innerHTML = result['all'];
            document.querySelector("#assign-me-tickets-panel-qtt").innerHTML = result['assign-me'];
            document.querySelector("#no-assign-tickets-panel-qtt").innerHTML = result['no-assign'];

        });

    }

    loadAllTicketsList(){
        
        

    }

}