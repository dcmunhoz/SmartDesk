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

            fetch('/api/ticket/open', {
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
            }).then(result=>result.json()).then(data => {

                resolve(data);

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

    /**
     * 
     * @param {string} type Tipo da lista que será retornada (Todos, sem atribuição, atribuidos ao usuário) 
     * @param {string} search Parametro para pesquisar o id do ticket. 
     * @param {string} select Parametro para exibir tickets com um status especifico.
     * 
     *  Retorna a lista de tickets de acordo com os parametros passados.
     * 
     */
    getTickets(type, search = "", select = ""){

        return new Promise((resolve, reject)=>{

            fetch(`/api/admin/tickets/list/${type}?s=${search}&q=${select}`).then(result=>{

                if(result.ok){

                    return result.json();

                }

                reject(result);

            }).then(data=>{

                resolve(data);

            });

        });

    },

    assign(idTicket, idUser){

        return new Promise((resolve, reject)=>{

            let body = {
                idUser
            }

            fetch(`/api/admin/ticket/assign/${idTicket}`, {
                method: 'POST',
                headers:{
                    "Content-Type":"Application/JSON"
                },
                body: JSON.stringify(body)
            }).then(result=>result.json()).then(data=>{
                if (data['error']) {
                    reject(data);
                }

                resolve(data);
            });

        });

    },

    unassign(idTicket, idUser){

        return new Promise((resolve, reject) => {

            fetch(`/api/admin/ticket/${idTicket}/unassign/${idUser}`, {method: "DELETE"}).then(result => {

                if(result.ok){
                    resolve(result);
                }

                reject();

            });

        });

    },

    getTicektDetails(ticketId){

        return new Promise((resolve, reject) => {

            fetch(`/api/admin/ticket/${ticketId}/details`).then(result=>result.json()).then(data=>{

                if(data['error']){
                    reject();
                }

                resolve(data);

            });

        });

    },

    end(ticketId, message) {
        return new Promise((resolve, reject) => {

            fetch(`/api/admin/ticket/${ticketId}/end`, {
                headers: {
                 'Content-Type':'application/json'
                },
                method: "PUT",
                body: JSON.stringify(message)
                
            }).then(result => result.json()).then(data => {

                if(data['error']){
                    reject(data);
                }

                resolve(data);

            });

        });
    },

    // Reprova uma solução
    reprove(idTicket, message) {

        return new Promise((resolve, reject) => {

            let body = {
                'text-new-message': message
            }

            fetch(`/api/ticket/${idTicket}/reject-solution`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'PUT',
                body: JSON.stringify(body)
            }).then(result => result.json()).then(data => {

                if (data['error']) {
                    reject(data);
                }

                resolve(data);

            })

        });

    },

    // Aprova uma solução
    aprove(idTicket){

        return new Promise((resolve, reject) => {

            fetch(`/api/ticket/${idTicket}/aprove-solution`, {
                method: 'PUT'
            }).then(result => result.json()).then(data => {

                if(data['error']){
                    reject['data']
                }

                resolve(data);

            });

        });

    }

}