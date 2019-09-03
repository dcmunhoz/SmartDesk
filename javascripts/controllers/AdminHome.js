/**
 * 
 * Controller da pagina inicial da administração.
 * 
 */

//Utilitários e Módulos
// import { Chart } from 'chart.js';
let Chart = require('../modules/Chart');

export default class AdminHome {

    constructor(){
        
        this.initCharts();

    }

    initCharts(){

        this.ticketsQuantity();
        this.chart1();


    }

    ticketsQuantity(){

        fetch('/api/admin/chart/tickets-quantity').then(result => result.json()).then(data => {

            document.querySelector("#ticket-count").innerHTML = data['total'];

        });

    }

    chart1(){   


    }

}