/**
 * 
 * Controle da pagina de atualização de empresa.
 * 
 */

// Utilitarios e Modulos
let Prototype = require('../utils/Prototypes');
let Company   = require('../modules/Company');

export default class AdminCompanyUpdate {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadData();

    }

    initEvents(){

        document.querySelector("btn-update").on('click', e=>{

            console.log("OK");

        });

    }


    loadData(){

        let idCompany = window.location.href.split("/")[window.location.href.split("/").length - 1];

        Company.find(idCompany).then(data=>{

            let form = document.querySelector("#form-company");

            Object.keys(data).forEach(key=>{

                form[key].value = data[key];

            });

        });

    }

}