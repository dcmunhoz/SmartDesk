/**
 * 
 * Controller da pagina de login. 
 * 
 */

 // Utilitários e Módulos.
const Prototype     = require('./../utils/Prototypes');
const User          = require('./../modules/User');
const Notification  = require('./../utils/Notification');

export default class Signin{

    constructor() {

        Prototype.initElementsPrototypes();
        this.initEvents();
        this.verifyAutoLogin();

    }

    /**
     * Inicia os eventos do controller.
     */
    initEvents(){

        // Faz o login do usuário.
        document.querySelector("#btn-user-login").on('click', e=>{
            e.preventDefault();
            
            let formLogin = document.querySelector("#form-user-login")
            if(formLogin.validateFields()){   

                // let formBody = new FormData(formLogin);
                let body = formLogin.getBody();
                
                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);
                
                setTimeout(()=>{

                    User.login(body).then(success=>{

                        let check = document.querySelector("#connected");

                        if (check.checked) {

                            let user = {
                                "user": document.querySelector("#username").value,
                                "pass": document.querySelector("#passw").value,
                                "connected": check.checked
                            };

                            localStorage.setItem("user", JSON.stringify(user));

                        }

                        window.location.replace('/');

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

    verifyAutoLogin(){

        if (localStorage.getItem('user')) {

            let body = new FormData();
            let user = JSON.parse(localStorage.getItem('user'));

            body.append('username', user['user']);
            body.append('passw', user['pass']);

            console.log(user);

            User.login(body).then(success=>{
            
                window.location.replace('/');

            });                 

        }

    }

}