const webpack = require('webpack');
const path    = require('path');

const babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015']
    }
};

module.exports = {
    context : path.join(__dirname, 'src', 'public'),

    entry: [
        './app.js'
    ],

    module: {
        loaders: [ babelLoader ]
    },

    output: {
        path     : path.join(__dirname, 'src', 'public'),
        filename : 'app.min.js'
    }
};
