(function () {
    'use strict';
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', lunchCheckController);

    lunchCheckController.$inject = ['$scope'];
    function lunchCheckController($scope) {
        $scope.lunch_menu = "";
        $scope.message = "";
        $scope.message_class = " text-danger";
        $scope.lunch_menu_class = "";
        $scope.checkIfTooMuch = function() {
            if ($scope.lunch_menu == "") {
                $scope.message = "Please enter data first";
                $scope.message_class = " text-danger";
                $scope.lunch_menu_class = " has-error";
                return;
            }

            var menu_items = $scope.lunch_menu.split(/\s*,\s*/);
            var menu_item_count = 0;

            for (var i = 0; i < menu_items.length; i++) {
                if (menu_items[i] != "")
                    menu_item_count++;
            }

            if (menu_item_count < 4) {
                $scope.message = "Enjoy!";
            }
            else {
                $scope.message = "Too much!";
            }

            $scope.message_class = " text-success";
            $scope.lunch_menu_class = " has-success";
        };
    }

})();