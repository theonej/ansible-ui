
import * as hapi from 'hapi';

import * as authSchema from './auth/authSchema';
import * as routes from './routes.js';

var server = new hapi.Server();
server.connection({port:8081, routes: 
	{ 
		cors: {
			additionalHeaders:["Client-Name", "token"]
		} 
	}
});


server.auth.scheme('custom', authSchema.tokenScheme);
server.auth.strategy('default', 'custom');
server.auth.default('default');

server.ext('onPreResponse', function (request, reply) {

    return reply.continue();
});

routes.register(server);

server.start(function(){
	console.log('server listening on port 8081');
});