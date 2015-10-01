import * as q from 'q';
var exec = require('child_process').exec;

let _command = '/etc/ansible/hosts';

export function getInventory(){
	let deferred = q.defer();

	exec(_command, function(err, stdout, stderror){
		if(err){
			deferred.reject(err);
		}else{
			deferred.resolve(stdout)
		}
	});

	return deferred.promise;
}