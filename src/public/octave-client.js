const net = require('net');
const exec = require('child_process').exec;
const path = require('path');
const { merge } = require('lodash');

const sockets = new WeakMap();
const optionsMap = new WeakMap();
const listenersMap = new WeakMap();

class OctaveClient {
    static defaultOptions = {
        bufferSize: 1000000,
        retryInterval: 1000,
        maxRetries: 5
    };

    constructor(options) {
        const { servicePath, port } = options;

        if (!(servicePath && port)) {
            throw new Error("both the service path and port must be specified");
        }

        sockets.set(this, new net.Socket());
        optionsMap.set(this, merge({}, OctaveClient.defaultOptions, options));
        listenersMap.set(this, new Set());
    }

    connect() {
        const { servicePath, port, bufferSize, retryInterval, maxRetries } = optionsMap.get(this);

        const promise = new Promise((resolve, reject) => {
            const resolvedDir = path.dirname(path.resolve(__dirname, servicePath));
            const listeners = listenersMap.get(this);
            const socket = sockets.get(this);
            let retries = 0;

            exec(`octave --no-gui ${ servicePath } ${ resolvedDir } ${ port } ${ bufferSize }`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    reject();
                }
            });

            socket.on('connect', () => {
                console.log("connected to octave service");
                resolve();
            });

            socket.on('error', (err) => {
                if (err.code === 'ECONNREFUSED' && retries < maxRetries) {
                    console.log(`connection refused, retrying in ${ retryInterval / 1000 }s...`);

                    setTimeout(() => {
                        socket.connect(port, 'localhost');
                    }, retryInterval);

                    retries++;
                } else {
                    console.error(err);
                    reject();
                }
            });

            socket.on('data', (chunk) => {
                listeners.forEach((listener) => {
                    listener(chunk);
                });
            });

            socket.connect(port, 'localhost');
        });

        return promise;
    }

    send(data) {
        sockets.get(this).write(`${ data }`);
    }

    addListener(listener, persist = false) {
        const listeners = listenersMap.get(this);

        if (persist) {
            listeners.add(listener);
        } else {
            const wrapper = (chunk) => {
                listener(chunk);
                this.removeListener(wrapper);
            };

            listeners.add(wrapper);
        }
    }

    removeListener(listener) {
        listenersMap.get(this).delete(listener);
    }
}

module.exports = OctaveClient;