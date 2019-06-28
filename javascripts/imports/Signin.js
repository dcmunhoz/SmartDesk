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
                
                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);
                
                User.login();
            }else{
                Notification.pop('danger', 'Dados invalidos', 'Alguns campos precisam ser preenchidos corretamente.');
            }

        });

    }

}