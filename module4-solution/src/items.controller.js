(function () {
	angular.module('MenuApp')
		.controller('ItemsController', ItemsController);

	ItemsController.$inject = ['data'];
	function ItemsController(data) {
		var self = this;
		self.items = data;
	}
})();