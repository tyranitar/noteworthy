const net = require('net');
const exec = require('child_process').exec;

const OctaveClient = function (octaveDir, port, bufferSize = 1000000) {
    this.socket = new net.Socket();

    exec(`octave --no-gui ${octaveDir} ${port} ${bufferSize}`,
        (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        }
    );

    this.socket.connect(port, 'localhost', () => {
        console.log("connected to octave service");
    });

    this.socket.on('data', (chunk) => {
        // Placeholder logic.
        console.log(chunk.toString());
    });
};

OctaveClient.prototype.send = function (data) {
    this.socket.write(`${data}\n`);
};

module.exports = OctaveClient;