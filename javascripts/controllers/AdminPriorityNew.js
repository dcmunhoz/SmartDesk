/**
 * 
 * Controller pagina nova prioridade
 * 
 */

 // Utilitários e Módulos
const Prototype = require('../utils/Prototypes');
const Notification = require('../utils/Notification');
const Priority  = require('../modules/Priority');

export default class AdminPriorityNew{

    constructor(){
        Prototype.initElementsPrototypes(); 

        this.initEvents();

    }

    initEvents(){
        
        document.querySelector("#btn-new").on('click', e => {

            let form = document.querySelector("#form-priority");

            if(form.validateFields()){

                // let body = new FormData(form);
                let body = form.getBody();

                Priority.save(body).then(resolve=>{

                    Notification.pop('success', 'Tudo certo !', 'A prioridade foi inserida.');
                    form.clear();
                    
                    // setTimeout(() => {
                    //     window.location.href = '/admin/configs'
                    // }, 3000);
                    
                }).catch(reject=>{
                    
                    Notification.pop('danger', 'Ooooops', 'Esta prioridade já existe.');


                });

            }

        });

    }

}