let User = require('../modules/User');
let Prototype = require('../utils/Prototypes');
export default class Header{

    constructor(){
        this.verifiNewUserTicketPage();        

        Prototype.initElementsPrototypes();
        this.initHeader();
        this.getUserData();
        

    }

    initHeader(){

        document.querySelector("#btn-show-user-panel").on('click', e=>{

            document.querySelector("#btn-show-user-panel").classList.toggle('active');
            if(document.querySelector("#btn-show-user-panel").classList.contains('active')){
                document.querySelector("#user-panel").style.display = 'flex';
                setTimeout(()=>{
                    document.querySelector("#user-panel").classList.add('active')

                },100);
            }else{
                document.querySelector("#user-panel").classList.remove('active')
                setTimeout(()=>{
                    document.querySelector("#user-panel").style.display = 'none';
                },100);
            }

        });

        document.querySelector("#btn-user-logout").on('click', e=>{

            window.location.replace('/logout');

        });

        document.querySelector("#btn-open-user-profile").on("click", e=>{
            User.getData().then(data=>{

                let userId = data.id_user;
                window.location.replace(` /profile/${userId}/edit `);

            });  
        });

    }

    getUserData(){

        User.getData().then(data=>{
            
            let displayName = User.getUserName(data);

            document.querySelector("#panel-user-name").innerHTML = displayName;

            let div = document.createElement('div');
            div.style.display = 'hidden';
            div.id = "user-data"
            div.dataset.user = JSON.stringify(data);


            document.querySelector("#app").appendChild(div);

        });
    }

    verifiNewUserTicketPage(){

        let page = document.querySelector("#page").dataset.page;

        let btn = document.querySelector("#btn-new-ticket");

        if (page === "AdminTicketNew") {
            btn.parentElement.classList.add('active');
        }

    }

}