/**
 * 
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * Controller principal da aplicação.
 * 
 */

 // Imports
import Signup from '../imports/Signup';
import Signin from '../imports/Signin';
import Header from '../utils/HeaderEvents';
import Home   from '../imports/Home';
import NewTicket from '../imports/NewTicket';
import TicketDetails from '../imports/TicketDetails';


export default class SmartDesk{

    constructor(){

        // Pega qual a pagina atual em que o usuário esta.
        this._actualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;
        
        // Paginas que estão na lista de exclusão, não executam o controller do Header.
        let excludePages = ['Signup', 'Signin'];
        if(!excludePages.includes(this._actualPage)){
            new Header();
        }

        // Executa o controller da pagina em que o usuário esta.
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
                case 'TicketDetails':
                    new TicketDetails();
                break;
            }
        }

    }

}