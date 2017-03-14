angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal) {
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
})

.controller('ModalInstanceController', function($scope, $modalInstance, $http) {
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.login = function(user) {
    return $http({
      method: 'POST',
      url: 'login',
      type: 'application/json',
      data: user,
    }).then(
    $modalInstance.close('close')
    )
  };
  $scope.signup = function(user) {
    return $http({
      method: 'POST',
      url: 'login',
      type: 'application/json',
      data: user,
    }).then(
    $modalInstance.close('close')
    )
  };
});
