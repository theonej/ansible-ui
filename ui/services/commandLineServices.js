ansible.ui.services.commandLineServices = function($http, $q, baseUrl){
	return {
		executeCommand:function(command){
			var deferred = $q.defer();

			var url = baseUrl + '/command?c=' + command;

			$http.get(url)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(err){
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};
};

ansible.ui.factory('commandLineServices', ['$http', '$q', 'baseUrl', ansible.ui.services.commandLineServices]);