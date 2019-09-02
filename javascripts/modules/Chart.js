module.exports = {

    qttMonths(){

        return new Promise((resolve, reject) => {

            fetch('/api/admin/chart/quantity-months').then(result => {
                
                console.log(result);

            });

        });

    }

}