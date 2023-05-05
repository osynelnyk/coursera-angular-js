(function () {
	'use strict';

	angular.module('public').service('SignUpService', SignUpService);

	function SignUpService() {
		var service = this;

		service.user = null;

		service.getUser = function () {
			return service.user;
		}
	}
})();