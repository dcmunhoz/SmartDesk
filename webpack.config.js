const path = require('path');

module.exports = {
    mode: 'development',
    entry: './javascripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/rsc/js'),
        publicPath: './public/rsc/js'

    },
    watch: true

}