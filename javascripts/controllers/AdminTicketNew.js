/**
 * Controller pagina novo ticket pelo admin
 */

// Utilitários & Módulos
const Prototype = require('../utils/Prototypes');
const Notification = require('../utils/Notification');
const User = require('../modules/User');

export default class AdminTicketNew {

  constructor(){

    this._assignments = [];

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

    document.querySelector("#btn-assign-me").on('click', e => {

      e.preventDefault();

      let user = JSON.parse(document.querySelector("#user-data").dataset.user);
      
      this.setAssignmentUser(user);

    });

    document.querySelector("#btn-add-to-assign").on('click', e => {

      e.preventDefault();

      let select = document.querySelector("#user-assign");

      if (select.value == 0) {

        select.parentNode.parentNode.classList.add('input-error');
        
      }else{
        
        select.parentNode.parentNode.classList.remove('input-error');

        let user = {};

        select.forEach(option => {

          if(select.value == option.value){

            user = {
              "id_user": option.value,
              "full_name": option.innerHTML
            };

          }


        });

        this.setAssignmentUser(user);
        
        select.value = 0;

      }

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

  /**
   * 
   * @param {int} userId Id do usuário
   * 
   * Carrega os setores vinculados ao usuário
   *  
   */
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

  /**
   * 
   * @param {array} idUser usuário a ser atribuido
   * 
   * Insere um usuário na lista de atribuição
   *  
   */
  setAssignmentUser(user){

    let exists = false;

    // Verifica se o usuário já esta na lista de atribuição
    this._assignments.forEach(usr => {

      if(usr['id_user'] == user['id_user']){

        exists = true;
        
      }
      
    })

    if(exists){

      Notification.pop("danger", "Oooops !!!", "Usuário já esta na lista de atribuição.");

    }else{

      this._assignments.push(user);
  
      this.listAssignmentUsers();

    }   


  }

  /**
   * Exibe na <ul> os usuário atribuidos
   */
  listAssignmentUsers(){

    const ul = document.querySelector("#assign-users");
    ul.innerHTML = "";

    this._assignments.forEach(user => {

      let li = document.createElement('li');
      li.dataset.idUser = user['id_user'];

      li.innerHTML = `
        <span><a href="" class="btn-remove-assign"><i class="fas fa-times-circle" title="Remover"></i></a></span>
        <span>${user['full_name']}</span>
      `;

      ul.appendChild(li);

    });
    
    this.loadListEvents();

  }

  /**
   * Carrega o evento de exclusão da lista de atribuições
   */
  loadListEvents(){

    document.querySelectorAll(".btn-remove-assign").forEach(btn => {

      btn.on('click', e => {

        e.preventDefault();

        let idUserRemove = e.target.parentNode.parentNode.parentNode.dataset.idUser;

        this._assignments = this._assignments.filter((user)=>{

          if(parseInt(user['id_user']) === parseInt(idUserRemove)){

            return false;

          }

          return true;

        })


        this.listAssignmentUsers();

      });

    });

  }
  
}