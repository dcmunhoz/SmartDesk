/**
 * 
 * Controller que gerencia a pagina de configuração da administração
 * 
 */

// Utilitários & Módulos
const Prototype = require('./../utils/Prototypes');


export default class AdminConfigs {

    constructor(){

        Prototype.initElementsPrototypes();

        this.initEvents();
        

    }

    initEvents(){

        // Troca os paineis
        document.querySelectorAll(".button-panel").forEach(btn=>{
            btn.on('click', e=>{

                // Painel alvo.
                let target = btn.dataset.target;
                
                this.disablePanels();

                document.querySelector(`#${target}-panel`).classList.add("panel-active");
                btn.classList.add('active');

            });
        });


    }

    disablePanels(){

        document.querySelectorAll(`.config-panel`).forEach(panel=>{
            panel.classList.remove('panel-active');
        });

        document.querySelectorAll(`.button-panel`).forEach(button=>{
            button.classList.remove('active');
        });


    }

}