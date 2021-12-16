'use strict';

const path = require('path');
const pino = require('pino');

const loggerA = pino(pino.transport({
    target: path.resolve(__dirname, './transport-simple.js'),
}));

const loggerB = pino({
    transport: {
        target: path.resolve(__dirname, './transport-from-abstract.js')
    },
});

const loggerC = pino({
    transport: {
        pipeline: [
            { target: path.resolve(__dirname, './transport-transform' ) },
            { target: path.resolve(__dirname, './transport-simple.js') }
        ],
    }
});

loggerA.info('message a');
loggerB.info('message b');
loggerC.info('message c');