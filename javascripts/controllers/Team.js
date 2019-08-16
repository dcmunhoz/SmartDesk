import { userInfo, type } from "os";

/**
 * 
 * Controller da pagina Colaboradores.
 * 
 */

// Utilitários & Módulos
const User = require('../modules/User');

 export default class Team {

    constructor(){

        this.initData();

    }


    initData(){

        User.getTeam().then(data => {

            [...data].forEach(user=>{

                let card = document.createElement('div');
                card.classList.add('card-team');

                let innerCard = `
                    <div class="card-row">
                        <h2>${user['full_name']}</h2>
                    </div>
                    <div class="card-row">
                        <label for="">Email:</label>
                        <span class="card-email">${user['email']}</span>
                    </div>
                `;            

                card.innerHTML = innerCard;

                document.querySelector('#team-box').appendChild(card);


            });

            

        }).catch(error => {



        })

    }

 }