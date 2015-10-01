import * as controllers from './controllers/';

export function register(server){
	server.route({method:'GET', path:'/inventory', handler:controllers.inventory.get, config:{auth:false}});
	server.route({method:'GET', path:'/command', handler:controllers.command.get, config:{auth:false}});
};