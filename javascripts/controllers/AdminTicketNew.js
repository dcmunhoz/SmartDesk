/**
 * Controller pagina novo ticket pelo admin
 */

// Utilitários & Módulos
const Prototype = require('../utils/Prototypes');
const User = require('../modules/User');

export default class AdminTicketNew {

  constructor(){

    Prototype.initElementsPrototypes();

    this.loadUsers(); // Carrega os requerentes.
    this.loadTeam();  // Carrega o time.

    this.initEvents();

  }

  /**
   * Eventos da pagina
   */
  initEvents(){

    document.querySelector("#user-request").on('change', e => {

      this.loadUserLocal(e.target.value);

    });

  }

  /**
   * Carrega a lista de usuários que podem solicitar tickets
   */
  loadUsers(){

    User.getUserList().then(data=>{

      let select = document.querySelector('#user-request');
      
      [...data].forEach(user=>{
        let option = document.createElement('option');
        option.value = user['id_user'];
        option.innerHTML = user['full_name'];

        select.appendChild(option);

        
        
      });

    }).catch(error=>{

      

    });

  }

  /**
   * Carrega a lista de administradores para atribuir um ticket
   */
  loadTeam(){

    User.getTeam().then(data=>{

      let select = document.querySelector("#user-assign");

      [...data].forEach(user => {

        let option = document.createElement('option');
        option.value = user['id_user'];
        option.innerHTML = user['full_name'];

        select.appendChild(option);
        

      });

    }).catch(error=>{



    });

  }

  /**
   * Carrega o local vinculado ao usuário
   */
  loadUserLocal(userId){

    User.getUserLocal(userId).then(data => {

      const select = document.querySelector("#local");

      [...data].forEach(local => {
        
        const option = document.createElement('option');
        option.value = local['id_local'];
        option.innerHTML = local['local_name'];
        option.selected = true;


        select.appendChild(option);

      });

      select.disabled = false;
      this.loadUserSector(userId);

    });

  }

  loadUserSector(userId){

    User.getUserSector(userId).then(data => {

      const select = document.querySelector("#sector");

      [...data].forEach(sector => {
        
        const option = document.createElement('option');
        option.value = sector['id_sector'];
        option.innerHTML = sector['sector_name'];
        option.selected = true;


        select.appendChild(option);

      });

      select.disabled = false;

    });

  }


}