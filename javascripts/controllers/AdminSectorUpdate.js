/**
 * 
 * Controller da pagina de atualização de setor.
 * 
 */

 // Utilitários e Módulos
 const Prototype = require('../utils/Prototypes');
 const Notification = require('../utils/Notification');
 const Local = require('../modules/Locals');
 const Sector = require('../modules/Sector');

 export default class AdminSectorUpdate {

    constructor(){
        Prototype.initElementsPrototypes();
        this.loadLocalsList();

        this.initEvents();

    }

    loadLocalsList(){

        Local.getLocals().then(data=>{

            let select = document.querySelector("#id_local");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_local'];
                option.innerHTML = row['local_name'];

                select.appendChild(option);
            });


            this.loadData();

        });

    }

    loadData(){

        let idSector = window.location.href.split("/")[window.location.href.split("/").length - 1];

        Sector.find(idSector).then(data=>{

            let form = document.querySelector("#form-sector");
            Object.keys(data).forEach(key=>{
                
                if (form[key]) {

                    form[key].value = data[key];

                }

            })

        })

    }

    initEvents(){

        document.querySelector("#btn-update").on('click', e => {

            let form = document.querySelector("#form-sector");

            if (form.validateFields()) {
                
                // let formData = new FormData(form);
                let body = form.getBody();

                Sector.update(body).then(data=>{

                    Notification.pop("success", "Setor Atualizado", "O setor foi atualizado com sucesso.");
                    form.clear();

                    // setTimeout(()=>{
                    //     window.location.href = "/admin/configs"
                    // }, 3000);

                }).catch(fail=>{

                    Notification.pop("danger", "Erro ao atualizar", "Setor já pertence ao local");

                });
            }

        });

    }

 }