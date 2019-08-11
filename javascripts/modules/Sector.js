module.exports = {

    /**
     * Retorna a lista de setores cadastradas no sistema.
     */
    getSectors(search = null){ 

        return new Promise((resolve, reject)=>{

            let data = {
                search
            }

            fetch('/api/admin/sectors/list', {
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

            fetch('/api/admin/sectors/quantity').then(result=>{

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

            fetch(`/api/admin/sector/new`, {
                method: 'POST',
                body
            }).then(result=>result.json()).then(data=>{

                if(data['error']){
                    reject(data);
                }

                resolve(data);

            });

        });

    },

    find(idSector){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/sector/${idSector}/find`).then(result=>result.json()).then(data=>{

                resolve(data);

            });

        });


    },

    update(body){
        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/sector/update`, {
                method: 'POST',
                body
            }).then(result=>result.json()).then(data=>{

                if(data['error']){
                    reject(data);
                }

                resolve(data);
            })

        });
    }

}