import Signup from '../imports/Signup';
import Signin from '../imports/Signin';
const Header = require('./../utils/HeaderEvents');

export default class SmartDesk{

    constructor(){

        this._actualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;
        let excludePages = ['Signup', 'Signin'];
    
        if(!excludePages.includes(this._actualPage)){
            Header.initHeader();
        }

        if(this._actualPage){
            switch(this._actualPage){
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