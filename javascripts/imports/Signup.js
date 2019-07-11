/**
 * 
 * Controller tela de cadastro de usuário.
 * 
 */

 // Utilitários & Módulos.
const Notification  = require('./../utils/Notification');
const Prototypes    = require('./../utils/Prototypes');
const User          = require('./../modules/User');

export default class Signup{

    constructor(){
        
        Prototypes.initElementsPrototypes();
        this.initEvents();

    }

    /**
     * Inicia os eventos do controller.
     */
    initEvents(){

        // Cria a conta do usuário.
        document.querySelector("#btn-create-account").on('click', (e)=>{
            e.preventDefault();

            let formCreate = document.querySelector("#form-create-new-account");
            if(formCreate.validateFields()){
                
                let form = new FormData(formCreate);

                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);

                setTimeout(()=>{
                    User.saveAccount(form).then(success=>{
                        Notification.pop("success", "Usuário cadastrado!", "Seu usuário foi cadastrado com sucesso.");
    
                        formCreate.clear(); 
    
    
                    }).catch(fail=>{
                        Notification.pop("danger", "Usuário não cadastrado!", fail['error'] );
                    });
    
                    e.target.removeChild(loadGif);
                    e.target.innerHTML = "Criar nova conta"
                }, 1000);          

            }else{
                Notification.pop('danger', 'Dados invalidos', 'Alguns campos precisam ser preenchidos corretamente.');
            }

        });

    }



}