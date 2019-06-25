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

            console.log(form.values()['create-name']);    

        });

    }



}