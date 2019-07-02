const Prototype     = require('./../utils/Prototypes');
const User          = require('./../modules/User');
const Notification  = require('./../utils/Notification');

export default class Signin{

    constructor() {

        Prototype.initElementsPrototypes();
        this.initEvents();

    }

    initEvents(){

        document.querySelector("#btn-user-login").on('click', e=>{

            let formLogin = document.querySelector("#form-user-login")
            if(formLogin.validateFields()){   

                let formBody = new FormData(formLogin);
                
                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);
                
                setTimeout(()=>{

                    User.login(formBody).then(success=>{

                        document.querySelector("#app").classList.add('login-fade');
                        setTimeout(()=>{
                            window.location.replace('/');
                        }, 500);

                    }).catch(failure=>{
                        console.clear();
                        Notification.pop('danger', 'Dados invalidos', failure['error']);

                        document.querySelector("#login-pass").value = "";
                        document.querySelector("#login-pass").focus();
                        document.querySelector("#login-pass").parentNode.classList.add("input-error");
                        document.querySelector("#login-username").parentNode.classList.add("input-error");

                    });                   

                    e.target.removeChild(loadGif);
                    e.target.innerHTML = "Entrar"

                },1000)
            }else{
                Notification.pop('danger', 'Dados invalidos', 'Alguns campos precisam ser preenchidos corretamente.');
            }

        });

    }

}