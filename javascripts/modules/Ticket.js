/**
 * Modulo que contem funções assincronas para os tickets.
 */

module.exports = {

    // Pega as informações dos tickets.
    get(ticketId){

        return new Promise((resolve, reject)=>{
            
            fetch(`/api/ticket/${ticketId}/details`).then(result=>result.json()).then(data=>{
                resolve(Object.values(data)[0]);
            }); 

        });

    },

    // Pega todos as prioridades disponiveis.
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

    // Abre um novo ticket.
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

    // Pega os status disponiveis
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

    // Adiciona uma mensagem a um ticket.
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

    },

    // Pega os dados inicais da pagina de tickets
    getPageData(){

        return new Promise((resolve, reject)=>{

            fetch('/api/admin/ticket-page-data').then(result=>{

                if(result.ok){
                    return result.json();
                }

                reject();
            }).then(data=>{

                resolve(data);

            });

        });

    },

    // Retorna todos os tickets para o admin
    getAllTicketsList(search = ""){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/tickets/list/all?s=${search}`).then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject();

            }).then(data=>{

                resolve(data);

            });

        });
        
    },

    // Retorna somente os tickets atribuidos para o admin logado
    getAssignMeTicketsList(search = ""){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/tickets/list/assign-me?s=${search}`).then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject(result);

            }).then(data=>{

                resolve(data);

            });

        });

    },

    // Retorna a lista dos tickets sem atribuição
    getNoAssignTicketsList(search = ""){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/tickets/list/no-assign?s=${search}`).then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject(result);

            }).then(data=>{

                resolve(data);

            });

        });

    }

}