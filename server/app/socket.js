'use strict';

module.exports = {
    name: 'socket',
    version: '0.0.1',
    register: async function (server, options) {
        let io = options.io;
        io.on('connection', function (socket) {
            console.log('A user has connected');

            socket.on('requestData', function (request) {
                console.log('request data');
            });

            socket.on('disconnect', function () {
                console.log('A user is disconnect');
            });
        });
    }
};
