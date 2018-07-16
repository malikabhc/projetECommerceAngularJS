var myShop = angular.module('shop', []);

myShop.run(function ($rootScope, $http) {
  $rootScope.qantity = {};
  $http.get('assets/database.json').then(function (response){
    $rootScope.items = response.data;
  });

});

myShop.controller('myContent', ['$scope', function ($scope) {
  $scope.addToBasket = function(index) {
    console.log($scope.qantity);
    if(!(index in $scope.qantity)){
      $scope.qantity[index] = 1;
    } else {
      $scope.qantity[index]++;
    }
  };
}]);

myShop.controller('myCart', ['$scope', function($scope){

}]);
