angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal) {
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
})

.controller('ModalInstanceController', function($scope, $modalInstance) {
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.signup = function() {
    $modalInstance.close('close');
  };
  $scope.login = function() {
    $modalInstance.close('close');
  };
});
