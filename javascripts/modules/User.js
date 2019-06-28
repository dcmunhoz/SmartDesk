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

    }

}