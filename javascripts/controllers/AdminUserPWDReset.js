/**
 * 
 * Controller que gerencia a pagina de reset de senha pela administração
 * 
 */

 // Utilitários e Modulos
 const Prototype = require('./../utils/Prototypes');
 const Notification = require('./../utils/Notification');
 const User = require("./../modules/User");


 export default class AdminUserPWDReset { 


    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();

    }

    initEvents(){

        document.querySelector("#btn-change-pass").on('click', e => {

            e.preventDefault();

            const form = document.querySelector("#form-reset-password");
            
            
            if (form.validateFields()) {
                let user = JSON.parse(document.querySelector("#user-data").dataset.user);
                let body = form.getBody();

                User.resetPassword(user['id_user'], body).then(data => {

                    Notification.pop('success', "Sucesso =D", "Senha alterada !");

                });
                
            }

        })

    }

 }