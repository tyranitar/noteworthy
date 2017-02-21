const OctaveClient = require('./octave-client');

const octaveClient = new OctaveClient('./octave/service.m', 8080);

octaveClient.send("Hello, World!");