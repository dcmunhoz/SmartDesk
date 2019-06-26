module.exports = {

    pop(type, title, message){

        let notification;

        if(document.querySelector("#notification-body")){

            notification = document.querySelector("#notification-body");

        }else{

            notification = document.createElement('div');
            notification.id = 'notification-body';
            document.querySelector("#app").appendChild(notification);
    
        }
        
        let templateBody = document.createElement("div");
        templateBody.classList.add("notification");
        let typeClass = (type === 'success') ? 'success' : 'danger';
        templateBody.classList.add(typeClass);
        
        let body = `
            <header>
                <h1>${title}</h1>
            </header>
            <section>
                <span> ${message} </span>
            </section>
        `;

        templateBody.innerHTML = body;
        
        notification.appendChild(templateBody);
        setTimeout(()=>{
            templateBody.classList.add('popup');
            setTimeout(()=>{
                templateBody.classList.remove('popup');

                setTimeout(()=>{
                    notification.removeChild(templateBody);
                }, 500);

            }, 10000);
        }, 100)
        

    }

}