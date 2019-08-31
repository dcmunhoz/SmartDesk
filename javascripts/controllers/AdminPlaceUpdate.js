/**
 * 
 * Controller da pagina de atualização de local.
 * 
 */

// Utilitarios e Modulos
let Prototype    = require('../utils/Prototypes');
let Notification = require('../utils/Notification');
let Local        = require('../modules/Locals');
let Company      = require('../modules/Company');

export default class AdminPlaceUpdate {

    constructor(){

        Prototype.initElementsPrototypes();
        this.loadCompanies();

        this.initEvents();

    }

    initEvents(){

        document.querySelector("#btn-update").on('click', e=>{

            let form = document.querySelector("#form-local");

            if (form.validateFields()) {

                document.querySelector("#city_name").disabled = false;
                
                // let formData = new FormData(form);
                let body = form.getBody();

                document.querySelector("#city_name").disabled = true;

                Local.update(body).then(result=>{


                    Notification.pop("success", "Sucesso", "Local editada !");
                    
                    setTimeout(() => {
                        window.location.href = "/admin/configs"
                    }, 1500);

                }).catch(fail=>{

                    console.clear();
                    Notification.pop("danger", "Erro ao editar", fail['message']);
                });

            }

        });

        document.querySelector("#city_cep").on('input focus', e => {
            
            let cep = e.target.value;

            cep = cep.replace("-", "");
            e.target.value = cep;

            if (cep.length === 8) {

                let cityNameField = document.querySelector("#city_name");
                
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

    loadData(){

        let idLocal = window.location.href.split("/")[window.location.href.split("/").length - 1];

        Local.find(idLocal).then(result=>{


            let form = document.querySelector("#form-local");
            Object.keys(result).forEach(key=>{
                
                
                if (form[key]) {

                    if (form[key].type == 'select-one') {


                        [...form[key]].forEach(option=>{
                            
                            if (option.value == result[key]) {
                                option.selected = true;
                            }

                        })
                        
                    }
                    
                    form[key].value = result[key];


                } 



            });

        });

    }

    loadCompanies(){

        Company.getCompanies().then(data=>{

            let select = document.querySelector("#id_company");
        
            [...data].forEach(row=>{

                let option = document.createElement("option");
                option.value = row['id_company'];
                option.innerHTML = row['company_name'];

                select.appendChild(option);
            });

            this.loadData();

        });

    }

}