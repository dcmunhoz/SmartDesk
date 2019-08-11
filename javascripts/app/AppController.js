/**
 * 
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * Controller principal da aplicação.
 * 
 */

 // Import dos controllers
import Signup             from '../controllers/Signup';
import Signin             from '../controllers/Signin';
import Header             from '../controllers/Header';
import Home               from '../controllers/Home';
import NewTicket          from '../controllers/NewTicket';
import TicketDetails      from '../controllers/TicketDetails';
import AdminSignin        from '../controllers/AdminSignin';
import AdminConfigs       from '../controllers/AdminConfigs';
import AdminTickets       from '../controllers/AdminTickets';
import AdminUserNew       from '../controllers/AdminUserNew';
import AdminUserUpdate    from '../controllers/AdminUserUpdate';
import AdminCompanyNew    from '../controllers/AdminCompanyNew';
import AdminCompanyUpdate from '../controllers/AdminCompanyUpdate';
import AdminPlaceNew      from '../controllers/AdminPlaceNew';
import AdminPlaceUpdate   from '../controllers/AdminPlaceUpdate';
import AdminSectorNew     from '../controllers/AdminSectorNew';


export default class AppController{

    constructor(){

        // Pega qual a pagina atual em que o usuário esta.
        this._actualPage = (document.querySelector("#page")) ? document.querySelector("#page").dataset.page : null;

        // Paginas que estão na lista de exclusão, não executam o controller do Header.
        let excludePages = ['Signup', 'Signin', 'AdminSignin'];
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
                case 'AdminSignin':
                    new AdminSignin();
                break;
                case 'AdminConfigs':
                    new AdminConfigs();
                break;
                case 'AdminTickets':
                    new AdminTickets();
                break;
                case 'AdminUserNew':
                    new AdminUserNew();
                break;
                case 'AdminUserUpdate':
                    new AdminUserUpdate();
                break;
                case 'AdminCompanyNew':
                    new AdminCompanyNew();
                break;
                case 'AdminCompanyUpdate':
                    new AdminCompanyUpdate();
                break;
                case 'AdminPlaceNew':
                    new AdminPlaceNew();
                break;
                case 'AdminPlaceUpdate':
                    new AdminPlaceUpdate();
                break;
                case 'AdminSectorNew':
                    new AdminSectorNew();
                break;
            }
        }

    }

}