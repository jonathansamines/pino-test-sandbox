'use strict';

const stream = require('stream');
const build = require('pino-abstract-transport');

const noop = () => null;

const settings = {
    enablePipelining: true,
};

module.exports = function transport() {
    function fn(source) {
        const transform = new stream.Transform({
            objectMode: true,
            autoDestroy: true,
            transform(chunk, encoding, cb) {
                this.push(chunk.msg.toUpperCase() + '\n');
                return cb();
            }
        });

        stream.pipeline(source, transform, noop);

        return transform;
    }

    return build(fn, settings);
}