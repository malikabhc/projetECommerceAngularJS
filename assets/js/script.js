var myShop = angular.module('shop', ['ngRoute']);

myShop.run(function ($rootScope, $http) {
  $rootScope.qantities = {};
  $rootScope.total = 0;
  $rootScope.totalQantity = 0;
  $rootScope.itemsCategories = '';
  $http.get('assets/database.json').then(function (response) {
    $rootScope.items = response.data;
  });

});
myShop.config(function($routeProvider){
  $routeProvider.when('/home', { templateUrl : 'assets/views/home.html', controller : 'myContent'});
  $routeProvider.when('/info/:id', { templateUrl : 'assets/views/info.html', controller : 'infoController'});
  $routeProvider.otherwise({ redirectTo : '/home'});
});
myShop.controller('myContent', ['$scope', function ($scope) {
  $scope.addToBasket = function (index) {
    if(!(index in $scope.qantities)) {
      $scope.qantities[index] = 1;
    } else {
      $scope.qantities[index]++;
    }
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };
  $scope.erase = function (index) {
    delete $scope.qantities[index];
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };
  $scope.qantityChange = function(index, val) {
    if($scope.qantities[index] + val <= 0)
    {
      return;
    }
    $scope.qantities[index] += val;
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };
  $scope.totalCalc = function(){
    $scope.total = 0;
    for (var key in $scope.qantities) {
      $scope.total += $scope.items[key].price * $scope.qantities[key];
    }
  };
  $scope.totalQantityCalc = function(){
    $scope.totalQantity = 0;
    for (var key in $scope.qantities) {
      $scope.totalQantity += $scope.qantities[key];
    }
  };
  $scope.changeFilter = function(newFilter){
    $scope.itemsCategories = newFilter;
  }
}]);
myShop.controller('infoController', ['$scope', '$routeParams', function ($scope, $routeParams){
  $scope.id = $routeParams.id;
}]);

function navbarClick($this){
  $('.navbar').find('.active').removeClass('active');
  $($this).parent().addClass('active');
};
