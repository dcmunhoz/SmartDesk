/**
 * 
 * Controller da pagina de novo usuário da administração
 * 
 */

// Utilitários e Modulos
let Prototype = require('../utils/Prototypes');
let Notification = require('../utils/Notification');
let User = require('../modules/User');
let Company = require('../modules/Company');
let Local = require('../modules/Locals');
let Sector = require('../modules/Sector');
let Profile = require('../modules/Profile');

export default class AdminUserNew {
    
    constructor(){
        
        Prototype.initElementsPrototypes();

        this.initEvents();


        this.loadProfilesList();
        this.loadCompaniesList();
        this.loadLocalsList();        
    }

    initEvents(){

        document.querySelector("#btn-new-user").on('click', e=>{

            let form = document.querySelector("#user-creation");

            if(form.validateFields()){

                // let formBody = new FormData(form);
                let body = form.getBody();

                User.newUser(body).then(data=>{

                    Notification.pop("success", "Usuário cadastrado", "Usuário cadastrado com sucesso.");
                    form.clear();
                    

                    // setTimeout(function(){

                    //     window.location.replace("/admin/configs");

                    // }, 3000);

                }).catch(err=>{
                    console.clear();
                    Notification.pop("danger", "Usuário não cadastrado", err['message']);

                });


            }

        });

        document.querySelector("#local").on('change', (e)=>{

            let placeId = document.querySelector("#local").value;

            this.loadSectorsList(placeId);
            document.querySelector("#sector").disabled = false;

        });

    }

    loadProfilesList(){

        Profile.getProfiles().then(data=>{

            let select = document.querySelector("#profile");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_profile'];
                option.innerHTML = row['profile_name'];

                select.appendChild(option);
            });

        });

    }

    loadCompaniesList(){

        Company.getCompanies().then(data=>{

            let select = document.querySelector("#company");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_company'];
                option.innerHTML = row['company_name'];

                select.appendChild(option);

            });

        });

    }

    loadLocalsList(){

        Local.getLocals().then(data=>{

            let select = document.querySelector("#local");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_local'];
                option.innerHTML = row['local_name'];

                select.appendChild(option);
            });



        });

    }

    loadSectorsList(idLocal){

        Sector.getSectors(idLocal).then(data=>{

            let select = document.querySelector("#sector");
            select.innerHTML = "";
            select.innerHTML = `
                <option value="0">Selecione uma opção</option>
            `;

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_sector'];
                option.innerHTML = row['sector_name'];

                select.appendChild(option);
            });

        });

    }

}