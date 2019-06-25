import Signup from './../imports/Signup';

export default class SmartDesk{

    constructor(){

        this._atualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;
        
        if(this._atualPage){
            switch(this._atualPage){
                case 'Signup':
                    new Signup();
                break;
            }
        }

    }

}