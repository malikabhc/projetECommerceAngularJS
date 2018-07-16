var myShop = angular.module('shop', []);

myShop.run(['$rootScope', '$http', function ($rootScope, $http) {
  $rootScope.quantity = {};
  $http.get('assets/database.json').then(function (response){
    $rootScope.items = response.data;
    console.log($rootScope.items);
  });
}]);

myShop.controller('myContent', ['$rootScope', '$scope', function ($rootScope, $scope) {
}]);

myShop.controller('myCart', ['$scope', function($scope){

}]);
