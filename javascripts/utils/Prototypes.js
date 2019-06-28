module.exports = {

    initElementsPrototypes(){
        Element.prototype.on = function(events, fn){

            events.split(" ").forEach(event=>{
                this.addEventListener(event, fn);
            });

        }

        HTMLFormElement.prototype.clear = function(e){

            [...this].forEach(el=>{
                el.value = "";
            })

        }


    }

}