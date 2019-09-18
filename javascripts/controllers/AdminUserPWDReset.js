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

                let idUser = window.location.pathname.split('/')[3];

                let body = form.getBody();

                User.resetPassword(idUser, body).then(data => {

                    Notification.pop('success', "Sucesso =D", "Senha alterada !");

                    setTimeout(() => {

                        window.location.href = `/admin/user/${idUser}`;

                    }, 2000);


                });
                
            }

        })

    }

 }