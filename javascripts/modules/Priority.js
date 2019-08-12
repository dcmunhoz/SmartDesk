module.exports = {

    /**
     * Retorna a lista de prioridades cadastradas no sistema.
     */
    getPriorities(search = null){ 

        return new Promise((resolve, reject)=>{

            let data = {
                search
            }

            fetch('/api/admin/priorities/list', {
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

            fetch('/api/admin/priorities/quantity').then(result=>{

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

            fetch(`/api/admin/priority/new`, {
                method: 'POST',
                body
            }).then(result=>result.json()).then(data => {
                
                if(data['error']){

                    reject(data);

                }

                resolve(data);

            });

        });
    }
    ,

    update(body){
        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/priority/update`, {
                method: 'POST',
                body
            }).then(result=>result.json()).then(data => {
                
                if(data['error']){

                    reject(data);

                }

                resolve(data);

            });

        });
    },

    find(idPriority){
        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/priority/${idPriority}/find`).then(result=>result.json()).then(data=>{

                if (data['error']) {
                    reject(data);
                }

                resolve(data);

            });

        });
    }


}