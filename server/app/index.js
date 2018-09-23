'use strict';

const Hapi  = require('hapi');

const server = Hapi.Server({
    host: 'localhost',
    port: '8000',
    router: {
        isCaseSensitive   : false,
        stripTrailingSlash: true
    },
    routes: {
        cors: true
    }
});

const run = async () => {
    await server.register(require('inert'));
    await server.register(require('./routes'));
    await server.register({
        plugin: require('./socket'),
        options: {
            io: require('socket.io')(server.listener)
        }
    });
    await server.start();
    return server;
};

module.exports = {
    run: () => {
        run()
        .then((server) => console.log('Server is running at:', server.info.uri))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        })
    }
};