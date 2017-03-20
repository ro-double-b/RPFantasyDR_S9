angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal, $state, $rootScope) {
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
  $scope.user = $rootScope.user;
  $scope.mobileDetection = function (bool) {
    if (bool) {
      $state.go('mobile');
    }
  };
});

