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

    }

    initEvents(){

        document.querySelector("#btn-create-account").on('click', (e)=>{
            e.preventDefault();

            let form = new FormData(document.querySelector("#form-create-new-account"));
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
                
                
                fetch('/signup', {
                    method: 'POST',
                    body: form
                }).then(response => response.json())
                  .then(json=>{
                        Notification.pop('danger', 'Lorem', 'Lorem ipsum dolore ammet');
                  });
            
            
            }else{
                Notification.pop('danger', 'Dados invalidos', 'Preencha corretamente os campos. dsadsadasdasdsadasddddddddd');
            }

        });

    }



}