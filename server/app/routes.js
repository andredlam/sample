'use strict';

module.exports = {
    name: 'static',
    version: '0.0.1',
    register: async function (server, options) {
        // -- static route
        server.route({
            method: 'GET',
            path: '/{param*}',
            options: {
                auth: false
            },
            handler: {
                directory: {
                    path: 'public',
                    redirectToSlash: true,
                    index: true
                }
            }
        });
    }
};
