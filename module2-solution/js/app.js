(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        }

        this.items = function () {
            return ShoppingListCheckOffService.toBuyItems();
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = function () {
            return ShoppingListCheckOffService.boughtItems();
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyList = [
            { name: "item1", quantity: 100 },
            { name: "item2", quantity: 90 },
            { name: "item3", quantity: 80 },
            { name: "item4", quantity: 70 },
            { name: "item5", quantity: 60 },
            { name: "item6", quantity: 50 },
            { name: "item7", quantity: 40 },
            { name: "item8", quantity: 30 },
            { name: "item9", quantity: 20 },
            { name: "item10", quantity: 10 }
        ];

        var boughtList = [];

        service.buyItem = function (index) {
            boughtList.push(toBuyList[index]);
            toBuyList.splice(index, 1);
        }

        service.toBuyItems = function () {
            return toBuyList;
        }

        service.boughtItems = function () {
            return boughtList;
        }
    }
    //lunchCheckController.$inject = ['$scope'];
    //function lunchCheckController($scope) {
    //    $scope.lunch_menu = "";
    //    $scope.message = "";
    //    $scope.message_class = " text-danger";
    //    $scope.lunch_menu_class = "";
    //    $scope.checkIfTooMuch = function() {
    //        if ($scope.lunch_menu == "") {
    //            $scope.message = "Please enter data first";
    //            $scope.message_class = " text-danger";
    //            $scope.lunch_menu_class = " has-error";
    //            return;
    //        }

    //        var menu_items = $scope.lunch_menu.split(/\s*,\s*/);
    //        var menu_item_count = 0;

    //        for (var i = 0; i < menu_items.length; i++) {
    //            if (menu_items[i] != "")
    //                menu_item_count++;
    //        }

    //        if (menu_item_count < 4) {
    //            $scope.message = "Enjoy!";
    //        }
    //        else {
    //            $scope.message = "Too much!";
    //        }

    //        $scope.message_class = " text-success";
    //        $scope.lunch_menu_class = " has-success";
    //    };
    //}

})();