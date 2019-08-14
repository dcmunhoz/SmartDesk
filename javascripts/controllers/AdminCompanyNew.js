import { format } from 'util';

/**
 * 
 * Controller da pagina nova empresa da administração.
 * 
 */

// Utilitários e Modulos
let Prototype = require('../utils/Prototypes');
let Notification = require('../utils/Notification');
let Company   = require('../modules/Company');

export default class AdminCompanyNew {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();

    }

    initEvents(){

        document.querySelector("#btn-new").on('click', e=>{

            let form = document.querySelector("#form-company");

            if(form.validateFields()){

                // let body = new FormData(form);
                let body = form.getBody();

                Company.save(body).then(data=>{

                    Notification.pop("success", "Sucesso", "Empresa cadastrada.");
                    
                    setTimeout(()=>{

                        window.location.href = "/admin/configs";

                    }, 3000);

                }).catch(err=>{

                    Notification.pop("danger", "oooops !!!", err['message'])

                });

            }   

        });

    }

}