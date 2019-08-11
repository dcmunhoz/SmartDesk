import { rejects, fail } from 'assert';

/**
 * 
 * Controller da pagina novo local.
 * 
 */

// Utilitários e Modulos
let Prototype    = require('../utils/Prototypes');
let Notification = require('../utils/Notification');
let Local        = require('../modules/Locals');
let Company      = require('../modules/Company');

export default class AdminPlaceNew {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadCompanyList();


    }

    initEvents(){

        document.querySelector("#btn-new").on('click', e=>{

            let form = document.querySelector("#form-local");

            if(form.validateFields()){

                document.querySelector("#city-name").disabled = false;
                
                let body = new FormData(form);

                document.querySelector("#city-name").disabled = true;

                Local.save(body).then(data=>{


                    Notification.pop("success", "Sucesso", "Empresa cadastrada.");
                    
                    setTimeout(()=>{

                        window.location.href = "/admin/configs";

                    }, 3000);

                }).catch(err=>{

                    console.log(err);

                    Notification.pop("danger", "Erro", err['message'])

                });

            }   

        });

        document.querySelector("#city-cep").on('input focus', e => {
            
            let cep = e.target.value;

            cep = cep.replace("-", "");
            e.target.value = cep;

            if (cep.length === 8) {

                let cityNameField = document.querySelector("#city-name");
                
                this.getCity(cep).then(data=>{

                    let { localidade } = data;

                    cityNameField.value = localidade;

                }).catch(fail=>{

                    cityNameField.value = "Inexistente";

                });

            }else if (cep.length >= 8) {

                e.target.value = cep.substring(0, 8);

            }
            

        });

    }

     getCity(cep){
        
        return new Promise((resolve, reject)=>{

            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response=>response.json()).then(data=>{

                if (data['erro']) {
                    reject();
                }
                
                resolve(data);
            });

        });
    }

    loadCompanyList() {
        
        Company.getCompanies().then(data=>{
            
            let companySelect = document.querySelector("#company");
            [...data].map(company=>{
                
                let option = document.createElement('option');
                
                option.value = company['id_company'];
                option.innerHTML = company['company_name'];

                companySelect.appendChild(option);
                

            });

        });

    }

}