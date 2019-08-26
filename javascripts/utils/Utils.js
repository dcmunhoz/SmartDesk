module.exports = {

    dateFormat(date){

        return ` ${(date.getDay() > '10' ) ? date.getDay() : '0' + date.getDay() }/${(date.getMonth() > '10' ) ? date.getMonth() : '0' + date.getMonth() }/${date.getFullYear()}`;

    },

    timeFormat(date){
        return `${(date.getHours() > '10') ? date.getHours() : '0' + date.getHours()}:${(date.getMinutes() > '10') ? date.getMinutes() : '0' + date.getMinutes() }`
    }
    
}