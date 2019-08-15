/**
 * 
 * Controle da pagina de atualização de empresa.
 * 
 */

// Utilitarios e Modulos
let Prototype    = require('../utils/Prototypes');
let Company      = require('../modules/Company');
let Notification = require('../utils/Notification');

export default class AdminCompanyUpdate {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadData();

    }

    initEvents(){

        document.querySelector("#btn-update").on('click', e=>{

            let form = document.querySelector("#form-company");

            if (form.validateFields()) {
                
                // let formData = new FormData(form);
                let body = form.getBody();

                Company.update(body).then(result=>{

                    Notification.pop("success", "Sucesso", "Empresa editada !");
                    form.clear();

                    // setTimeout(() => {
                    //     window.location.href = "/admin/configs"
                    // }, 3000);

                }).catch(fail=>{

                    console.clear();
                    Notification.pop("danger", "Erro ao editar", fail['message']);
                });

            }

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