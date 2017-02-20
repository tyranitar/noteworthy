var webpack = require('webpack');
var path    = require('path');

var babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015']
    }
};

// Not transpiling server code since everything breaks.
module.exports = { // Client.
    context : path.join(__dirname, '.', 'public'),
    entry: [
        './client.js'
    ],

    node: {
      __dirname: true,
    },

    module: {
        loaders: [ babelLoader ]
    },

    output: {
        path     : path.join(__dirname, 'public'),
        filename : 'client.min.js'
    }
};
