// Définition du Module Angularjs
var myShop = angular.module('shop', ['ngRoute']);
// Definition du run qui s'executera une fois au demarrage de la page
myShop.run(function ($rootScope, $http) {
  // Definition des rootScope qui seront utilisées dans les controller
  $rootScope.qantities = {};
  $rootScope.total = 0;
  $rootScope.totalQantity = 0;
  $rootScope.itemsCategories = '';
  // Lien vers le base json
  $http.get('assets/database.json').then(function (response) {
    $rootScope.items = response.data;
  });
});
myShop.config(function($routeProvider){
  $routeProvider.when('/home', { templateUrl : 'assets/views/home.html', controller : 'myContent'});
  $routeProvider.when('/info/:id', { templateUrl : 'assets/views/info.html', controller : 'infoController'});
  $routeProvider.otherwise({ redirectTo : '/home'});
});
// Definition du controller qui va contenir les différentes fonctions du panier et des éléments
myShop.controller('myContent', ['$scope', function ($scope) {
  // fonction qui va nous permettre d'ajouter des produits au panier
  $scope.addToBasket = function (index) {
    if(!(index in $scope.qantities)) {
      $scope.qantities[index] = 1;
    } else {
      $scope.qantities[index]++;
    }
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };
  // Definition de la fonction qui va permettre de supprimer des élements dans le panier
  $scope.erase = function (index) {
    delete $scope.qantities[index];
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };

  // defintion de la fonction qui va permettre de changer de quantité dans le panier
  $scope.qantityChange = function (index, val) {
    if($scope.qantities[index] + val <= 0)
    {
      return;
    }
    $scope.qantities[index] += val;
    $scope.totalCalc();
    $scope.totalQantityCalc();
  };
  // boucle et fonction permettant de faire le calcule du total
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
