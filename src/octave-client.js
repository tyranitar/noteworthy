const net = require('net');
const exec = require('child_process').exec;
const path = require('path');

const defaultBufferSize = 1000000;
const retryInterval = 1000;
const maxRetries = 5;

class OctaveClient {
    constructor(options) {
        this.options = options;
        this.socket = new net.Socket();
    }

    connect() {
        const { servicePath, port, bufferSize = defaultBufferSize } = this.options;

        const promise = new Promise((resolve, reject) => {
            const resolvedDir = path.dirname(path.resolve(__dirname, servicePath));
            let retries = 0;

            exec(`octave --no-gui ${ servicePath } ${ resolvedDir } ${ port } ${ bufferSize }`, (err, stdout, stderr) => {
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
        this.socket.write(`${ data }`);
    }

    receive(callback) {
        this.socket.on('data', callback);
    }
}

module.exports = OctaveClient;