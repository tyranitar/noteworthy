const net = require('net');
const exec = require('child_process').exec;

const defaultBufferSize = 1000000;
const retryInterval = 1000;
const maxRetries = 5;

class OctaveClient {
    constructor(options) {
        this.options = options;
        this.socket = new net.Socket();
    }

    connect() {
        const { serviceDir, port, bufferSize = defaultBufferSize } = this.options;

        const promise = new Promise((resolve, reject) => {
            let retries = 0;

            exec(`octave --no-gui ${ serviceDir } ${ port } ${ bufferSize }`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    reject();
                }
            });

            this.socket.on('connect', () => {
                console.log("connected to octave service");
                resolve();
            });

            this.socket.on('error', (err) => {
                if (err.code === 'ECONNREFUSED' && retries < maxRetries) {
                    console.log(`connection refused, retrying in ${ retryInterval / 1000 }s...`);

                    setTimeout(() => {
                        this.socket.connect(port, 'localhost');
                    }, retryInterval);

                    retries++;
                } else {
                    console.error(err);
                    reject();
                }
            });

            this.socket.connect(port, 'localhost');
        });

        return promise;
    }

    send(data) {
        this.socket.write(`${ data }\n`);
    }

    receive(callback) {
        this.socket.on('data', callback);
    }
}

module.exports = OctaveClient;