module.exports = {

    initElementsPrototypes(){
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

        HTMLFormElement.prototype.validateFields = function(e){
            let validation = false;

            [...this].forEach(el=>{
                if (el.type !== "button") {
                    let formGroup = document.querySelector(`#${el.id}`).parentNode;

                    if (el.value.trim() === '') {
                        formGroup.classList.add('input-error');
                        validation = true;

                    }else{

                        if(formGroup.classList.contains('input-error')){
                            formGroup.classList.remove('input-error');
                        }
                    
                    }

                    if(el.type === 'email'){

                        if(el.value.includes("@")){
                            if(!el.value.includes(".")){
                                formGroup.classList.add('input-email-error');
                                formGroup.classList.add('input-error');
                                validation = true;
                            }
                        }else{
                            formGroup.classList.add('input-email-error');
                            formGroup.classList.add('input-error');
                            validation = true;
                        }
                    }

                    if(el.id === 'create-confirm-pass'){

                        if(this.elements['create-pass'].value !== el.value){
                            formGroup.classList.add('input-error');
                            formGroup.classList.add('input-error');
                            validation = true;
                        }
    
                    }

                }
                

            });

            return !validation;

        }


    }

}