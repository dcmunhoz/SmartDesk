module.exports = {

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

    getData(){

        return new Promise((resolve, reject)=>{

            fetch('/api/user-logged').then(data => data.json()).then(json=>{

                resolve(json);

            });

        });

    }

}