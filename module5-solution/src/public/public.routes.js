(function () {
	'use strict';

	angular.module('public')
		.config(routeConfig);

	/**
	 * Configures the routes and views
	 */
	routeConfig.$inject = ['$stateProvider'];
	function routeConfig($stateProvider) {
		// Routes
		$stateProvider
			.state('public', {
				abstract: true,
				templateUrl: 'src/public/public.html'
			})
			.state('public.home', {
				url: '/',
				templateUrl: 'src/public/home/home.html'
			})
			.state('public.menu', {
				url: '/menu',
				templateUrl: 'src/public/menu/menu.html',
				controller: 'MenuController',
				controllerAs: 'menuCtrl',
				resolve: {
					menuCategories: ['MenuService', function (MenuService) {
						return MenuService.getCategories();
					}]
				}
			})
			.state('public.menuitems', {
				url: '/menu/{category}',
				templateUrl: 'src/public/menu-items/menu-items.html',
				controller: 'MenuItemsController',
				controllerAs: 'menuItemsCtrl',
				resolve: {
					menuItems: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
						return MenuService.getMenuItems($stateParams.category);
					}]
				}
			})
			.state('public.sign-up', {
				url: '/sign-up',
				templateUrl: 'src/public/sign-up/sign-up.html',
				controller: 'SignUpController',
				controllerAs: 'signUpCtrl'
			})
			.state('public.my-info', {
				url: '/my-info',
				templateUrl: 'src/public/my-info/my-info.html',
				resolve: {
					user: ['SignUpService', function (SignUpService) {
						return SignUpService.getUser();
					}],
					favoriteMenuItem: ['user', 'MenuService', '$q', function (user, MenuService, $q) {
						if (user == null) {
							return $q.resolve(null);
						}

						return MenuService.getMenuItem(user.favorite);
					}]
				},
				controller: ['$scope', 'user', 'favoriteMenuItem', function ($scope, user, favoriteMenuItem) {
					$scope.user = user;

					$scope.favoriteMenuItem = favoriteMenuItem;
				}],
			//	controllerAs: '$ctrl'
			});
	}
})();
