var myShop = angular.module('shop', []);

myShop.run(function ($rootScope) {
  $rootScope.quantity = {};
  $rootScope.items = [];
});

myShop.controller('myContent', ['$scope', '$http', function ($scope, $http) {

}]);

myShop.controller('myCart', ['$scope', function($scope){

}]);
