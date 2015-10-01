import * as commandLineManager from '../shared/ansible/command/commandLineManager';

export function get(request, response){
	var command = request.query.c;
	
	commandLineManager.execute(command)
		.then(function(result){
			return response(result).code(200);
		})
		.fail(function(err){
			console.log(err);
			return response(err).code(500);
		})
};