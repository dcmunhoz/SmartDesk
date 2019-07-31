module.exports = {

    /**
     * Retorna a lista de empresas cadastradas no sistema.
     */
    getCompanies(search = null){ 

        return new Promise((resolve, reject)=>{

            let data = {
                search
            }

            fetch('/api/admin/companies/list', {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }).then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject();
            
            }).then(data=>{

                resolve(data);
            
            });

        });

    },

    /**
     * Retorna a quantidade de empresas criadas.
     */
    getQuantity(){

        return new Promise((resolve, reject)=>{

            fetch('/api/admin/companies/quantity').then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject();

            }).then(data=>{

                resolve(data);

            });

        });

    },

    /**
     * Adiciona uma nova empresa
     */
    save(body){

        return new Promise((resolve, reject)=>{

            fetch(`/admin/company/new`, {
                method: "POST",
                body
            }).then(result=>result.json()).then(data=>{

                if(data['error']){
                    reject(data);
                }   

                resolve(data);

            });

        });

    }

}