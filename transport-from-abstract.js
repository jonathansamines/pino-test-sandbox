'use strict';

const build = require('pino-abstract-transport');
const sonic = require('sonic-boom');
const stream = require('stream');

const noop = () => null;
const settings = {  };

module.exports = function transport() {
    function fn (source) {
        const transform = new stream.Transform({
            objectMode: true,
            autoDestroy: true,
            transform(chunk, encoding, cb) {
                return cb(null, chunk.msg.toUpperCase() + '\n');
            }
        });

        const destination = sonic({
            dest: 1, // stdout
            sync: false,
        })

        destination.on('unknown', function handleUnknown(chunk) {
            destination.write(write + '\n');
        });

        stream.pipeline(source, transform, destination, noop)

        return transform;
    }

    return build(fn, settings);
}