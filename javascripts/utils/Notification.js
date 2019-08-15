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
            <footer>
                <div>  </div>
            </footer>
        `;

        templateBody.innerHTML = body;
        
        notification.appendChild(templateBody);
        setTimeout(()=>{
            templateBody.classList.add('popup');

            templateBody.addEventListener('click', e=>{

                this.pupout(notification, templateBody);

            });

            let timeout = 4000;
            let frameTick = timeout * 0.010;

            setTimeout(()=>{

                this.pupout(notification, templateBody);

            }, timeout);

            let footer = templateBody.lastElementChild;
            let width = 100;
            let id = setInterval(frame, frameTick);
            function frame() {

                if (width == 0) {
                    clearInterval(id);
                }else{
                    width--;
                    footer.style.width = width + '%';
                }

            }

        }, 100);
        

    },

    pupout(box, notification){

        if(notification.parentNode){

            
            notification.classList.remove('popup');
            
            setTimeout(()=>{
                box.removeChild(notification);
            
            }, 500);

        }


    }

}