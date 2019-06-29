let User = require('./../modules/User');
let Prototype = require('./Prototypes');
export default class Header{

    constructor(){

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
            
            let userFullName = data.full_name.split(" ");
            let displayName = "";

            (userFullName.length > 1) ? displayName = `${userFullName[0]} ${userFullName[ userFullName.length - 1 ]}` : displayName = userFullName[0] ;
            
            document.querySelector("#panel-user-name").innerHTML = displayName;


        });
    }

}