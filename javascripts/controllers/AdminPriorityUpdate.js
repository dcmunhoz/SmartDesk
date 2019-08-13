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
        this.loadData();    

        this.initEvents();
 
     }
 
     initEvents(){
         
         document.querySelector("#btn-update").on('click', e => {
 
             let form = document.querySelector("#form-priority");
 
             if(form.validateFields()){
 
                //  let body = new FormData(form);
                let body = form.getBody();
 
                 Priority.update(body).then(resolve=>{
 
                     Notification.pop('success', 'Tudo certo !', 'A prioridade foi atualizada.');
                     setTimeout(() => {
                         window.location.href = '/admin/configs'
                     }, 3000);
                     
                 }).catch(reject=>{
                     
                     Notification.pop('danger', 'Ooooops', 'Esta prioridade já existe.');
 
 
                 });
 
             }
 
         });
 
     }
 
     loadData(){

        let idPriority = window.location.href.split("/")[window.location.href.split("/").length - 1];


        Priority.find(idPriority).then(resolve=>{

            let form = document.querySelector("#form-priority");

            console.log(resolve);
            Object.keys(resolve).forEach(key => {

                form[key].value = resolve[key];

            });

        }).catch(rejec=>{



        });

     }
 }