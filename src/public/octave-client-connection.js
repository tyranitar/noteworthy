const OctaveClient = require('./octave-client');

const octaveClient = new OctaveClient({
    servicePath: 'C:/Users/Tyron/Documents/GitHub/personal/noteworthy/src/octave/service.m',
    port: 8080
});

// octaveClient.connect().then(() => {
//     octaveClient.send('C:/Users/Tyron/Documents/GitHub/personal/noteworthy/data/wav/01-170319_1514.wav');
// }).catch(() => {
//     console.error("failed to connect to octave service");
// });
//
// octaveClient.receive((chunk) => {
//     console.log(chunk.toString());
// });

const promise = new Promise((resolve, reject) => {
    octaveClient.connect().then(() => {
        resolve(octaveClient);
    });
});

module.exports = promise;