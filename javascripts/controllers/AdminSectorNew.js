/**
 * 
 * Controller da pagina de novo setor
 * 
 */

// Utilitários e Módulos
const Prototype = require('../utils/Prototypes');
const Notification = require('../utils/Notification');
const Local     = require('../modules/Locals');
const Sector    = require('../modules/Sector');

 export default class AdminSectorNew {

    constructor(){
        Prototype.initElementsPrototypes();

        this.loadLocalsList();

        this.initEvents();

    }

    initEvents(){
        
        document.querySelector("#btn-send").on('click', e => {

            let form = document.querySelector("#form-sector");

            if(form.validateFields()){

                let formData = new FormData(form);

                Sector.save(formData).then(data=>{

                    Notification.pop('success', 'Sucesso', 'O setor foi cadastrado.');
                    setTimeout(() => {
                        window.location.href = '/admin/configs'
                    }, 3000);

                }).catch(fail=>{
                    console.clear();
                    Notification.pop('danger', 'Erro ao cadastrar', 'Setor já cadastrado para este local.');

                });

            }

        });


    }

    loadLocalsList(){

        Local.getLocals().then(data=>{

            let select = document.querySelector("#local");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_local'];
                option.innerHTML = row['local_name'];

                select.appendChild(option);
            });

        });

    }
 }