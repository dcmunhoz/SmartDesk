/**
 * 
 * Controller pagina de login da administração
 * 
 */

 // Utilitários & Módulos
 const Prototype = require("./../utils/Prototypes");
 const User      = require('./../modules/User');
 const Notification = require('./../utils/Notification');

 export default class AdminSignin{

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();        
    }

    // Inicia os eventos da pagina.
    initEvents(){
        

        // Faz o login do usuário.
        document.querySelector("#btn-signin-admin").on('click', e=>{

            let formSignin = document.querySelector("#form-signin-admin");

            if(formSignin.validateFields()){
                
                let formData = new FormData(formSignin);
                
                // Animação de loading no button.
                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);

                setTimeout(()=>{

                    User.loginAdmin(formData).then(response=>{

                        document.querySelector("#app").classList.add('login-fade');
                        setTimeout(()=>{
                            window.location.replace('/admin');
                        }, 500);
                        
    
                    }).catch(err=>{
                        console.clear();
                        Notification.pop('danger', "Erro no login", err.error);

                        
                        document.querySelector("#passw").value = "";
                        document.querySelector("#passw").focus();
                        document.querySelector("#passw").parentNode.classList.add("input-error");
                        document.querySelector("#username").parentNode.classList.add("input-error");


                    });

                    e.target.removeChild(loadGif);
                    e.target.innerHTML = "Entrar"

                }, 1000);

            }

        });

    }


 }