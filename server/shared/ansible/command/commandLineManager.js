import * as q from 'q';
var exec = require('child_process').exec;


export function execute(command){
	
	let deferred = q.defer();

	command = 'ansible '  + command.replace('ansible', '');

	exec(command, function(err, stdout, stderror){
		if(err){
			deferred.reject(err);
		}else{
			deferred.resolve(stdout)
		}
	});

	return deferred.promise;
}