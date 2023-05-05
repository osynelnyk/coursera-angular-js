(function () {
	"use strict";

	angular.module('common')
		.service('MenuService', MenuService);


	MenuService.$inject = ['$http', 'ApiPath'];
	function MenuService($http, ApiPath) {
		var service = this;

		service.getCategories = function () {
			return $http.get(ApiPath + '/categories.json').then(function (response) {
				return response.data;
			});
		};


		service.getMenuItems = function (category) {
			return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
				return response.data;
			});
		};

		service.getMenuItem = function (item) {
			var category = '';
			var index = '';

			var tokens = item.toUpperCase().match(/([A-Z]+)([0-9]+)/);
			if (tokens != null && tokens.length == 3) {
				category = tokens[1];
				index = (parseInt(tokens[2]) - 1).toString();
			}
			
			return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + index + '.json').then(function (response) {
				if (response.data != null) {
					response.data.categoryShortName = category; // Add 'categoryShortName' property for later use
				}
				
				return response.data;
			});
		};

	}



})();
