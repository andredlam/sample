'use strict';

module.exports = {
    name: 'socket',
    version: '0.0.1',
    register: async function (server, options) {
        let io = options.io;
        io.on('connection', function (socket) {
            console.log('A user has connected');

            socket.on('message', function (request) {
                console.log('request data');
            });

            socket.on('disconnect', function () {
                console.log('A user is disconnect');
            });

            setInterval(() => {
                let data = {
                    'id': 6,
                    'total': 68,
                    'enrolled': 32
                };
                console.log('sending: ' + JSON.stringify(data));

                data.id = Math.floor(Math.random() * 6) + 1;
                data.total = Math.floor(Math.random() * 120);
                data.enrolled = Math.floor(Math.random() * data.total);

                io.emit('message', data);
            }, 2000);
        });
    }
};
