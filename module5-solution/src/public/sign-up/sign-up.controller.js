(function () {
	'use strict';

	angular.module('public').controller('SignUpController', SignUpController);

	SignUpController.$inject = ['SignUpService', 'MenuService'];
	function SignUpController(SignUpService, MenuService) {
		var ctrl = this;

		ctrl.saved = false;
		ctrl.favoriteNotFound = false;

		ctrl.submit = function () {
			console.log(ctrl.user);

			ctrl.saved = false;
			ctrl.favoriteNotFound = false;

			MenuService.getMenuItem(ctrl.user.favorite).then(function (data) {
				if (data != null) {
					SignUpService.user = ctrl.user;

					ctrl.saved = true;
				}
				else {
					ctrl.favoriteNotFound = true;
				}
			});

		};
	}

	// Favorite validator directive
	angular.module('public').directive('favorite', FavoriteDirective);

	FavoriteDirective.$inject = ['MenuService', '$q'];
	function FavoriteDirective(MenuService, $q) {
		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {

				ctrl.$asyncValidators.favorite = function (modelValue, viewValue) {

					var def = $q.defer();

					MenuService.getMenuItem(modelValue)
						.then(function (data) {
							if (data != null) {
								def.resolve();
							}
							else {
								def.reject();
							}
							return data;
						});

					return def.promise;
				};
			}
		};
	}
})();