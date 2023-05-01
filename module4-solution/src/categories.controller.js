(function () {
	angular.module('MenuApp')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['data'];
	function CategoriesController(data) {
		var self = this;
		self.categories = data;
	}
})();