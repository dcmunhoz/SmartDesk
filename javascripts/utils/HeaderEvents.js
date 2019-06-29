module.exports = {
    initHeader(){

        document.querySelector("#btn-show-user-panel").addEventListener('click', e=>{
            
            document.querySelector("#btn-show-user-panel").classList.toggle('active');
            if(document.querySelector("#btn-show-user-panel").classList.contains('active')){
                document.querySelector("#user-panel").style.display = 'flex';
                setTimeout(()=>{
                    document.querySelector("#user-panel").classList.add('active')

                },100);
            }else{
                document.querySelector("#user-panel").classList.remove('active')
                setTimeout(()=>{
                    document.querySelector("#user-panel").style.display = 'none';
                },100);
            }

        });

        document.querySelector("#btn-user-logout").addEventListener('click', e=>{

            window.location.replace('/logout');

        });

    }
}