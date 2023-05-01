(function () {
	angular.module('data')
		.service('MenuDataService', MenuDataService);

	MenuDataService.$inject = ['$http', 'ApiBasePath'];
	function MenuDataService($http, ApiBasePath) {
		var self = this;

		self.getAllCategories = function () {
			return $http(
				{
					method: 'GET',
					url: (ApiBasePath + 'categories.json')
				});
		};

		self.getItemsForCategory = function (categoryShortName) {
			return $http(
				{
					method: 'GET',
					url: (ApiBasePath + 'menu_items/' + categoryShortName + '.json')
				});
		};
	}
})();