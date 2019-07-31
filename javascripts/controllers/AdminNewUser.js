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

export default class AdminNewUser {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();

        this.loadProfilesList();
        this.loadCompaniesList();
        this.loadLocalsList();
        this.loadSectorsList();
    }

    initEvents(){

        document.querySelector("#btn-new-user").on('click', e=>{

            let frmUserCreate = document.querySelector("#user-creation");

            if(frmUserCreate.validateFields()){

                let formBody = new FormData(frmUserCreate);

                User.newUser(formBody).then(data=>{

                    Notification.pop("success", "Usuário cadastrado", "Usuário cadastrado com sucesso.");
                    
                    setTimeout(function(){

                        window.location.replace("/admin/configs");

                    }, 3000);

                }).catch(err=>{
                    
                    Notification.pop("danger", "Usuário não cadastrado", "Houve um erro ao cadastrar o usuário.");

                });


            }

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
                option.value = row['id_place'];
                option.innerHTML = row['local_name'];

                select.appendChild(option);
            });

        });

    }

    loadSectorsList(){

        Sector.getSectors().then(data=>{

            let select = document.querySelector("#sector");

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_sector'];
                option.innerHTML = row['sector_name'];

                select.appendChild(option);
            });

        });

    }

}