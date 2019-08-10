module.exports = {

    /**
     * Retorna a lista de locais cadastradas no sistema.
     */
    getLocals(search = null){ 

        return new Promise((resolve, reject)=>{

            let data = {
                search
            }

            fetch('/api/admin/locals/list', {
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

            fetch('/api/admin/locals/quantity').then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject();

            }).then(data=>{

                resolve(data);

            });

        });

    },
    
    save(body){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/local/new`, {
                method: 'POST',
                body
            }).then(response=>response.json()).then(data=>{

                console.log(data);

            });
            
        });
        
    }

}