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
        this.loadStatusSelect();
        this.loadLists();

    }

    initEvents(){

        // Troca de paineis
        document.querySelectorAll(".btn-switch-panel").forEach(btn=>{
            
            btn.on('click', e=>{
                
                let target = btn.dataset.target;

                this.switchPanel(target);

            });

        });

        // Faz a pesquisa de ticket de acordo com a pesquisa.
        document.querySelectorAll('.search-ticket').forEach(search=>{

            search.on('keyup', e=>{
                
                let target = search.dataset.target;
                let searchValue = search.value;
                let selectValue = "";

                selectValue = document.querySelector(`#status-${target}-tickets`).value;                            
                this.getTickets(target, searchValue, selectValue);

            });

        });

        // Exibe os tickets com o status especificado.
        document.querySelectorAll('.ticket-status-options').forEach(select=>{

            select.on('change', e=>{

                let target = select.dataset.target;
                let selectValue = select.value;
                let searchValue = "";
                
                searchValue = document.querySelector(`#search-${target}`).value;                            
                this.getTickets(target, searchValue, selectValue);

            });

        });

    }

    /**
     * Inicia os eventos das rows.
     */
    initTableRowEvents(){
        
        

    }

    /**
     * 
     * Carrega todas as listas de tickets ao abrir a pagina.
     * 
     */
    loadLists(){

        this.getTickets('all');
        this.getTickets('assign-me');
        this.getTickets('no-assign');

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
        this.disableButtonPanel();
        document.querySelector(`#tickets-${target}`).classList.add('panel-active');
        document.querySelector(`#btn-panel-${target}`).classList.add('btn-panel-active');

    }


    /**
     * Desativa todos os paineis de ticket.
     */
    disablePanels(){
        document.querySelectorAll(".target-panel").forEach(panel=>{

            panel.classList.remove('panel-active');

        });
    }

    /**
     * Desativa todos os botões da troca de painel.
     */
    disableButtonPanel(){

        document.querySelectorAll(".btn-switch-panel").forEach(btn=>{

            btn.classList.remove('btn-panel-active');

        });

    }

    /**
     * Carrega os dados de quantidade de tickets na pagina.
     */
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

    /**
     * 
     * @param {string} type Tipo da lista que será retornada (Todos, sem atribuição, atribuidos ao usuário) 
     * @param {string} search Parametro para pesquisar o id do ticket. 
     * @param {string} select Parametro para exibir tickets com um status especifico.
     * 
     *  Retorna a lista de tickets de acordo com os parametros passados.
     * 
     */
    getTickets(type, search = "", select = ""){

        Ticket.getTickets(type, search, select).then(result=>{

            this.setTableData(`table-${type}-tickets`, result);

            this.initTableRowEvents();

        }).catch(err=>{
            this.setTableNoData(`table-${type}-tickets`);
            console.clear();
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
                <td><span class="status-ticket status-${ticketStatusClassName}"></span> ${row['status_name']}</td>
                <td>${row['ticket_title']}</td>
                <td>${row['full_name']}</td>
                <td>-</td>
                <td>${Utils.dateFormat( new Date(row['dt_creation']) )}</td>
                <td style="color: ${row['priority_color']};" >${row['priority_name']}</td>
                <td>${Utils.dateFormat( new Date(row['dt_updates']) )}</td>
            `;

            tr.innerHTML = trBody;
            tbody.appendChild(tr);


        });

    }

    /**
     * 
     * @param {string} tableId Nome da tabela.
     * 
     * Insere os dados retornados do banco na tabela especifica.
     * 
     */
    setTableNoData(tableId){

        let tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = "";

        let tr = document.createElement('tr');
        tr.classList.add('no-tickets');

        let inner = `

            <td colspan="9">... Nenhum ticket a ser listado. </td>

        `;

        tr.innerHTML = inner;
        tbody.appendChild(tr);

    }

    /**
     * Carrega os status dentro do <select>
     */
    loadStatusSelect(){

        Ticket.getStatus().then(data=>{

            document.querySelectorAll(".ticket-status-options").forEach(select=>{             
                
                [...data].forEach(row=>{
                    let option = document.createElement('option');
                    
                    option.value = row['id_status'];
                    option.innerHTML = row['status_name']

                    if(row['id_status'] == 1){
                        option.selected = true;
                    }

                    select.appendChild(option);


                });


            });

        });

    }


}