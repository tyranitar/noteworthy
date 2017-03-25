const path = require('path');

const OctaveClient = require('./octave-client');

const octaveClient = new OctaveClient({
    servicePath: path.resolve(process.cwd(), './src/octave/service.m'),
    port: 8080
});

const promise = new Promise((resolve, reject) => {
    octaveClient.connect().then(() => {
        resolve(octaveClient);
    });
});

module.exports = promise;