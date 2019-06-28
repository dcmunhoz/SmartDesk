import Signup from '../imports/Signup';
import Signin from '../imports/Signin';
const Header = require('./../utils/HeaderEvents');

export default class SmartDesk{

    constructor(){

        this._atualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;
        // Header.initHeader();

        if(this._atualPage){
            switch(this._atualPage){
                case 'Signup':
                    new Signup();
                break;
                case 'Signin':
                    new Signin();
                break;
            }
        }

    }

}