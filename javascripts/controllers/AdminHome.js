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

        this.chart1();

    }

    chart1(){   

        Chart.qttMonths();

    }

}