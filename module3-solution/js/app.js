(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItemsDirective)
		.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/");

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var self = this;

		self.found = [];
		self.nothingFound = false;
		self.searchTerm = '';
		self.searched = false;

		self.narrowItDown = function () {
			self.searched = true;
			if (self.searchTerm == '') {
				self.found = [];
				self.nothingFound = true;
				return;
			}

			var promise = MenuSearchService.getMatchedMenuItems(self.searchTerm);

			promise.then(function (foundItems) {
				self.found = foundItems;
				self.nothingFound = (self.found.length == 0);
			});
		};

		self.removeItem = function (index) {
			self.found.splice(index, 1);
		};
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var self = this;

		self.getMatchedMenuItems = function (searchTerm) {
			var promise = $http(
				{
					method: 'GET',
					url: (ApiBasePath + 'menu_items.json')
				})
				.then(function (result) {
					var foundItems = [];
					var data = result.data;
					
					for (var category_key in data) {
						var category = data[category_key];

						for (var menu_item_key in category.menu_items) {
							var menu_item = category.menu_items[menu_item_key];

							// case-insensitive regex search
							if (menu_item.description.search(new RegExp(searchTerm, "i")) != -1)
								foundItems.push(menu_item);
						}
					}

					return foundItems;
				});

			return promise;
		};
	}

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			restrict: 'E',
			scope: {
				items: '<foundItems',
				nothingFound: '<nothingFound',
				searched: '<searched',
				removeItem: '&onRemove'
			}
		};

		return ddo;
	}

})();