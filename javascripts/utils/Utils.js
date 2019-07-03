module.exports = {

    dateFormat(date){

        return ` ${(date.getDay() > '10' ) ? date.getDay() : '0' + date.getDay() } / ${(date.getMonth() > '10' ) ? date.getMonth() : '0' + date.getMonth() } / ${date.getFullYear()}`;

    }
    
}