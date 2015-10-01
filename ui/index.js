var ansible = {};
ansible.ui = angular.module('ansible-ui', ['ngRoute', 'ngCookies']);

ansible.ui.controllers = {};
ansible.ui.controllers.command = {};
ansible.ui.services = {};

ansible.ui.value('baseUrl', 'http://localhost:8081');

var routeConfig = function($routeProvider){
	$routeProvider.
		when('/commandLine', {
			templateUrl:'html/command/commandLine.html',
			controller:'commandLineController'
		})
		.otherwise({
			redirectTo:'/'
		});
};

ansible.ui.config(['$routeProvider', routeConfig]);