import { type } from 'os';

/**
 * 
 * Controller que gerencia a pagina geral de tickets.
 * 
 */

// Utilitários & Módulos
const Prototype = require('./../utils/Prototypes');
const Ticket    = require('./../modules/Ticket');
const Utils     = require('./../utils/Utils');

export default class AdminTickets{

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadInitialDatas();
        this.loadLists();
        this.loadStatusSelect();

    }

    initEvents(){

        document.querySelectorAll(".btn-switch-panel").forEach(btn=>{
            
            btn.on('click', e=>{
                

                let target = btn.dataset.target;

                this.switchPanel(target);

            });

        });


        document.querySelectorAll('.search-ticket').forEach(search=>{

            search.on('keyup', e=>{
                
                let target = search.dataset.target;
                let searchValue = search.value;
                console.log(searchValue);
                switch(target){
                    case 'all':
                        this.getAllTicketsList(searchValue);
                    break;
                    case 'assign-me':
                        this.getAssignMeTicketsList(searchValue);
                    break;
                    case 'no-assign':
                        this.getNoAssignTicketsList(searchValue);
                    break;
                }

            });

        });


    }

    /**
     * 
     * Carrega todas as listas de tickets ao abrir a pagina.
     * 
     */
    loadLists(){

        this.getAllTicketsList();
        this.getAssignMeTicketsList();
        this.getNoAssignTicketsList();

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

    getAllTicketsList(search){

        Ticket.getAllTicketsList(search).then(result=>{

            this.setTableData('table-all-tickets', result);
            

        }).catch(err=>{

            this.setTableNoData('table-all-tickets');
            
        });

    }

    getAssignMeTicketsList(search){

        Ticket.getAssignMeTicketsList(search).then(result=>{

            this.setTableData('table-assign-me-tickets', result);
            

        }).catch(err=>{
            
            this.setTableNoData('table-assign-me-tickets');
            
        });

    }

    getNoAssignTicketsList(search){

        Ticket.getNoAssignTicketsList(search).then(result=>{

            this.setTableData('table-no-assign-tickets', result);
            

        }).catch(err=>{
            
            this.setTableNoData('table-no-assign-tickets');
            
        });

    }


    /**
     * 
     * @param {String} tableId Nome da tabela que serão exibido os dados.
     * @param {Object} result  Objeto com os dados da consulta ao banco de dados.
     * 
     * Seta os dados na tabela informada.
     * 
     */
    setTableData(tableId, result){
        
        let tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = "";

        [...result].forEach(row=>{
            let tr = document.createElement('tr');
            tr.dataset.id_ticket = row['id_ticket'];

            let ticketStatusClassName = "";
            switch(row['status_name']){
                case 'Aberto':
                    ticketStatusClassName = 'open';
            }

            let trBody = `
                <td> <a title="Atribuir ticket a você" id="btn-assign-me" class="btn-assign-me" href="/api/admin/ticket/assign-me/${row['id_ticket']}"><i class="fas fa-arrow-circle-down"></i></a> </td>
                <td>#${row['id_ticket']}</td>
                <td><span class="status-ticket status-${ticketStatusClassName}">${row['status_name']}</span></td>
                <td>${row['ticket_title']}</td>
                <td>${row['full_name']}</td>
                <td>-</td>
                <td>${Utils.dateFormat( new Date(row['dt_creation']) )}</td>
                <td style="color: #${row['font_color']};" >${row['priority_name']}</td>
                <td>${Utils.dateFormat( new Date(row['dt_updates']) )}</td>
            `;

            tr.innerHTML = trBody;
            tbody.appendChild(tr);


        });

    }

    setTableNoData(tableId){

        let tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = "";

        let tr = document.createElement('tr');
        tr.classList.add('no-tickets');

        let inner = `

            <td colspan="9">... Você não tem nenhum ticket atribuido.</td>

        `;

        tr.innerHTML = inner;
        tbody.appendChild(tr);

    }

    loadStatusSelect(){

        Ticket.getStatus().then(data=>{

            document.querySelectorAll(".ticket-status-options").forEach(select=>{

                select.innerHTML = "";                
                
                [...data].forEach(row=>{
                    let option = document.createElement('option');
                    
                    option.value = row['id_status'];
                    option.innerHTML = row['status_name']

                    select.appendChild(option);


                });


            });

        });

    }


}