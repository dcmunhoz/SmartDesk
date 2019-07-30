module.exports = {

    getProfiles(){
        
        return new Promise((resolve, reject)=>{

            fetch("/api/admin/profiles/list").then(result=>{

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