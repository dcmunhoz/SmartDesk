module.exports = {

    getPriorities(){

        return new Promise((resolve, reject)=>{

            fetch('/api/priorities').then(results=>results.json()).then(data=>{
                if(data.error){
                    reject(data);
                }

                resolve(data);
            });

        });

    }

}