module.exports = {

    get(ticketId){

        return new Promise((resolve, reject)=>{
            
            fetch(`/api/ticket/${ticketId}/details`).then(result=>result.json()).then(data=>{
                resolve(Object.values(data)[0]);
            }); 

        });

    },

    getPriorities(){

        return new Promise((resolve, reject)=>{

            fetch('/api/priorities').then(results=>results.json()).then(data=>{
                if(data.error){
                    reject(data);
                }

                resolve(data);
            });

        });

    },

    open(body){
        
        return new Promise((resolve, reject)=>{

            fetch('/ticket/open', {
                method: 'POST',
                body
            }).then(result=>result.json()).then(data=>{
                
                    if(data.error){
                        reject(data);
                    }

                    resolve(data);

            })

        });

    },

    getStatus(){

        return new Promise((resolve, reject)=>{
            fetch('/api/ticket/status').then(function(result){
                if(result.ok){
                    resolve(result.json());
                }else{
                    reject(result.json());
                }
            });
        });

    },

    addMessage(ticketId, body){

        return new Promise((resolve, reject)=>{
            fetch(`/api/ticket/${ticketId}/add-message`,{
                method: "POST",
                body
            }).then(result=>{
                if(result.ok){
                    resolve(result.json())
                }

                reject(result.json())
            });
        });

    }

}