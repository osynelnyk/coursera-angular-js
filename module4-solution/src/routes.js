(function () {
	angular.module('MenuApp')
		.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

		// Redirect to home if no other URL matches
		$urlRouterProvider.otherwise('/');

		// Set up UI states
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'src/home.template.html'
			})

			.state('categories', {
				url: '/categories',
				templateUrl: 'src/categories.template.html',
				controller: 'CategoriesController as ctrl',
				resolve: {
					data: ['MenuDataService',
						function (MenuDataService) {
							return MenuDataService.getAllCategories()
								.then(function (response) {
									return response.data;
								});
						}]
				}
			})

			.state('items', {
				url: '/items/{itemID}',
				templateUrl: 'src/items.template.html',
				controller: 'ItemsController as ctrl',
				resolve: {
					data: ['MenuDataService', '$stateParams',
						function (MenuDataService, $stateParams) {
							return MenuDataService.getItemsForCategory($stateParams.itemID)
								.then(function (response) {
									return response.data;
								});
						}]
				}
			});
	}
})();