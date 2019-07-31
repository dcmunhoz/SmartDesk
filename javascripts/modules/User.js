/**
 * Modulo que contem funções assincronas para usuários.
 */

module.exports = {
    
    /**
     * 
     * @param {object} body Contem os dados do usuário a ser salvo.
     * 
     * Salva uma nova conta.
     *  
     */
    saveAccount(body){

        return new Promise((resolve, reject)=>{

            fetch('/signup', {
                method: 'POST',
                body
            }).then(result => {
                if(result.status !== 200){
                    console.clear();
                    reject({
                        'error': 'Ocorreu um erro ao processar esta requisição.'
                    });
                }

                resolve(result);

            });

        });

    },

    /**
     * 
     * @param {object} body Contem dados do usuários.
     * 
     * Faz o login do usuário.
     *  
     */
    login(body){

        return new Promise((resolve, reject)=>{

            fetch('/signin', {
                method: 'POST',
                body
            }).then(result => result.json() ).then(json=>{
                if(json['error']){
                    reject(json);
                }
                
                resolve();
                
            });

        });

    },

    /**
     * Pega os dados do usuário logado.
     */
    getData(){

        return new Promise((resolve, reject)=>{

            fetch('/api/user-logged').then(data => data.json()).then(json=>{

                resolve(json);

            });

        });

    },

    /**
     * 
     * @param {object} data Dados do usuário logado.
     * 
     * Retorna o nome do usuário formatado.
     * 
     */
    getUserName(data){
        let userFullName = data.full_name.split(" ");

        return (userFullName.length > 1) ? displayName = `${userFullName[0]} ${userFullName[ userFullName.length - 1 ]}` : displayName = userFullName[0] ;
            
           
    },

    /**
     * 
     * @param {integer} statusId Id do status para exibir.
     * 
     * Exibe a lista de tickets de acordo com o status informado.
     * 
     */
    getTicketList(statusId = null){

        return new Promise((resolve, reject)=>{

            fetch(`/api/tickets/list?status=${statusId}`).then(response=>response.json()).then(data=>{
                if(data.error){
                    console.clear();
                    reject(data);
                }

                resolve(data);
            });

        });

    },

    /**
     * 
     * @param {object} body Objeto com dados para login
     * 
     * Login na administração
     *  
     */
    loginAdmin(body){

        return new Promise((resolve, reject)=>{
            
            fetch('/admin/signin', {
                method:'POST',
                body
            }).then(result=>result.json()).then(data=>{

                if(data['error']){
                    reject(data);
                }

                resolve(data);

            });
            
        });

    },

    /**
     * 
     * @param {string} search pesquisa de usuário. 
     * 
     * Retorna a lista de usuários.
     * 
     */
    getUserList(search = null){

        return new Promise((resolve, reject)=>{

            let data = {
                search
            }

            fetch('/api/admin/users/list', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
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
     * 
     * Quantidade de usuários
     * 
     */
    getUserQtd(){

        return new Promise((resolve, reject)=>{

            fetch('/api/admin/users/qtd').then(result=>{

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
     * Adiciona um novo usuário pela administração.
     * 
     */
    newUser(body){

        return new Promise((resolve, reject)=>{

            fetch("/admin/user/new",{
                method: "POST",
                body
            }).then(result=>{

                if(result.ok){
                    
                    return result.json();

                }

                reject();

            }).then(data=>{

                resolve(data);

            });            

        });

    }

}