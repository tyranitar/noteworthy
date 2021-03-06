const webpack = require('webpack');
const path    = require('path');

const babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015', 'stage-0']
    }
};

module.exports = {
    context : path.join(__dirname, 'src', 'public'),
    target: "electron",
    entry: [
        './app.js'
    ],

    module: {
        loaders: [ babelLoader ]
    },

    output: {
        path     : path.join(__dirname, 'src', 'public'),
        filename : 'app.min.js'
    },

    plugins: [
        new webpack.IgnorePlugin(/vertx/)
    ]
};
