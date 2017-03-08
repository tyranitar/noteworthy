const OctaveClient = require('./octave-client');

const octaveClient = new OctaveClient({
    serviceDir: './octave/service.m',
    port: 8080
});

octaveClient.connect().then(() => {
    octaveClient.send("Hello, World!");
});