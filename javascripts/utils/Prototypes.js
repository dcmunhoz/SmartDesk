module.exports = {

    initElementsPrototypes(){
        Element.prototype.on = function(events, fn){

            events.split(" ").forEach(event=>{
                this.addEventListener(event, fn);
            });

        }

        HTMLFormElement.prototype.clear = function(e){

            [...this].forEach(el=>{
                
                if (el.type !== 'checkbox') {
                    el.value = "";
    
                    if (el.type == 'select-one') {
                        el.value = 0;
                    }
                }
                
            });

        }

        HTMLFormElement.prototype.getBody = function(e){

            [...this].forEach(el => {

                el.value = el.value.trim();

            });

            let body = new FormData(this);

            return body;

        }

        HTMLFormElement.prototype.validateFields = function(e){
            let validation = false;

            [...this].forEach(el=>{
                if (el.type !== "button" && el.type !== 'hidden' && el.type !== "submit") {
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

                    if (el.type == 'password') {

                        if (el.value.length <= 5) {
                            formGroup.classList.add('input-password-error');
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

                    if(el.type === 'select-one' && el.id !== "user-assign"){
                        if(el.value === '0'){
                            formGroup.classList.add('input-error');
                            formGroup.classList.add('input-error');
                            validation = true;
                        }

                    }

                    if (el.id === 'city-cep' || el.id === 'city_cep') {

                        if (el.value.length < 8) {
                            formGroup.classList.add('input-error');
                            formGroup.classList.add('input-error');
                            validation = true;
                        }

                    }

                    if(el.id === 'city-name' || el.id === 'city_name'){
                        if(el.value === 'Inexistente'){
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