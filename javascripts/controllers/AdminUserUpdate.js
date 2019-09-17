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

export default class AdminUserUpdate {


    constructor(){

        this._user = {};

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadUserData();



    }

    initEvents(){

        document.querySelector("#btn-update").on('click', e=>{

            let form = document.querySelector("#form-user");

            if(form.validateFields()){

                // let body = new FormData(form);
                let body = form.getBody();


                User.update(body).then(result=>{

                    Notification.pop("success", "Usuário alterado.", "A alteração foi realizada com sucesso.");

                    setTimeout(()=>{
                        window.location.href = "/admin/configs";
                    }, 1500);


                }).catch(err=>{

                    Notification.pop("danger", "Erro na alteração", err['message']);

                });

            }

        });

        document.querySelector("#local").on('change', (e)=>{

            let placeId = document.querySelector("#local").value;

            this.loadSectorsList(placeId);
            document.querySelector("#sector").disabled = false;

        });

    }

    loadUserData(){

        let idUser = window.location.href.split("/")[window.location.href.split("/").length - 1];

        User.find(idUser).then(data=>{

            this._user = data;

            this.showUserData();

            this.loadCompaniesList();
            this.loadLocalsList();
            this.loadProfilesList();
            this.loadSectorsList();

        });

    }

    showUserData(){

        let form = document.querySelector("#form-user");

        form['old_username'].value = this._user['username'];
        document.querySelector("#btn-change-passw").href = `/admin/user/${this._user['id_user']}/password-reset`;

        Object.keys(this._user).forEach(key=>{

            if(document.querySelector(`#${key}`)){

                switch(form[key].type){

                    case 'checkbox':
                        form[key].checked = this._user[key] == true;
                    break;

                    default:
                        form[key].value = this._user[key];
                    break;
                }

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
                option.selected = ( row['id_profile'] == this._user['id_profile'] ) ? true : false;

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
                option.selected = ( row['id_company'] == this._user['id_company'] ) ? true : false;

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
                option.selected = ( row['id_local'] == this._user['id_local'] ) ? true : false;

                if (row['id_local'] == this._user['id_local']) {

                    this.loadSectorsList(row['id_local']);

                }

                select.appendChild(option);
            });

        });

    }

    loadSectorsList(placeId){

        Sector.getSectors(placeId).then(data=>{

            let select = document.querySelector("#sector");
            select.innerHTML = "";
            select.innerHTML = `
                <option value="0">Selecione uma opção</option>
            `;

            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_sector'];
                option.innerHTML = row['sector_name'];
                option.selected = ( row['id_sector'] == this._user['id_sector'] ) ? true : false;

                select.appendChild(option);
            });

        });

    }


}