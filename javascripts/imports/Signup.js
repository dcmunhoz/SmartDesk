const Notification = require('./../utils/Notification');

export default class Signup{

    constructor(){
        this.initSignup();
    }

    initSignup(){
    
        this.elementsPrototype();
        this.initEvents();
    
    }

    elementsPrototype(){

        Element.prototype.on = function(events, fn){

            events.split(" ").forEach(event=>{
                this.addEventListener(event, fn);
            });

        }

        HTMLFormElement.prototype.clear = function(e){

            [...this].forEach(el=>{
                el.value = "";
            })

        }

    }

    initEvents(){

        document.querySelector("#btn-create-account").on('click', (e)=>{
            e.preventDefault();

            let formCreate = document.querySelector("#form-create-new-account");
            let form = new FormData(formCreate);
            let formValidation = [];

            
            form.forEach((value, key)=>{

                let formGroup = document.querySelector(`#${key}`).parentNode;

                if(value.trim() === ""){
                    
                    formGroup.classList.add('input-error');
                    formValidation.push(true);

                }else{

                    if(formGroup.classList.contains('input-error')){
                        formGroup.classList.remove('input-error');
                    }
                    
                }

                if(key === 'create-email'){

                    if(value.includes("@")){
                        if(!value.includes(".")){
                            formGroup.classList.add('input-email-error');
                            formGroup.classList.add('input-error');
                            formValidation.push(true);
                        }
                    }else{
                        formGroup.classList.add('input-email-error');
                        formGroup.classList.add('input-error');
                        formValidation.push(true)
                    }
                }

                if(key === 'create-confirm-pass'){

                    if(form.get('create-pass') !== value){
                        formGroup.classList.add('input-error');
                        formGroup.classList.add('input-error');
                        formValidation.push(true);
                    }

                }

            });

            if(!formValidation.length > 0){
                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);

                
                fetch('/signup', {
                    method: 'POST',
                    body: form
                }).then(response => {
                    console.clear();
                    
                    setTimeout(()=>{
                        if(!response.ok){
                            Notification.pop("danger", "Usuário não cadastrado!",'Não foi possivel criar seu usuário, entre em contato com um administrador.' );
                        }else{
                            Notification.pop("success", "Usuário cadastrado!", "Seu usuário foi cadastrado com sucesso.");
                        };
                        e.target.removeChild(loadGif);
                        e.target.innerHTML = "Criar nova conta"

                        formCreate.clear();

                    }, 1000);
 
                });
            
            
            }else{
                Notification.pop('danger', 'Dados invalidos', 'Alguns campos precisam ser preenchidos corretamente.');
            }

        });

    }



}