import Signup from '../imports/Signup';
import Signin from '../imports/Signin';
import Header from '../utils/HeaderEvents';
import Home   from '../imports/Home';
import NewTicket from '../imports/NewTicket';

export default class SmartDesk{

    constructor(){

        this._actualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;
        let excludePages = ['Signup', 'Signin'];
    
        if(!excludePages.includes(this._actualPage)){
            new Header();
        }

        if(this._actualPage){
            switch(this._actualPage){
                case 'Signup':
                    new Signup();
                break;
                case 'Signin':
                    new Signin();
                break;
                case 'Home':
                    new Home();
                break;
                case 'NewTicket':
                    new NewTicket();
                break;
            }
        }

    }

}