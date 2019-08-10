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

export default class  {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        this.loadCompanyList();


    }

    initEvents(){

        document.querySelector("#btn-new").on('click', e=>{

            let form = document.querySelector("#form-place");

            if(form.validateFields()){

                let body = new FormData(form);

                Local.save(body).then(data=>{

                    console.log(data);

                    // Notification.pop("success", "Sucesso", "Empresa cadastrada.");
                    
                    // setTimeout(()=>{

                    //     window.location.href = "/admin/configs";

                    // }, 3000);

                }).catch(err=>{

                    console.log(err);

                    // Notification.pop("danger", "Erro", err['message'])

                });

            }   

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