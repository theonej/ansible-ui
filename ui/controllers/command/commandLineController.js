ansible.ui.controllers.command.commandLineController = function($scope, commandLineServices){

	$scope.commandLine = {
		value:''
	};

	$scope.initialize = function(){

	};

	$scope.execute = function(){
		commandLineServices.executeCommand($scope.commandLine.value)
			.then(function(result){
				console.log(result);
			}, function(err){
				console.log(err);
			});
	};
};

ansible.ui.controller('commandLineController', ['$scope', 'commandLineServices', ansible.ui.controllers.command.commandLineController])