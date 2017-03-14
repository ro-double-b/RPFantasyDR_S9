angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal) {
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
})

.controller('ModalInstanceController', function($scope, $modalInstance, $http, $modal) {
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.invalidLogin = function(type) {
    $modal.open({
      templateUrl: `./app/partials/${type}.html`,
      controller: 'InvalidLogin',
    });
  };

  $scope.login = function(user) {
    return $http({
      method: 'POST',
      url: 'api/login',
      type: 'application/json',
      data: user,
    }).then((res) => {
      $modalInstance.close('close');
      if (res.data === "incorrect") {
        $scope.invalidLogin('invalidLogin');
      }
    });
  };
  $scope.signup = function(user) {
    return $http({
      method: 'POST',
      url: 'api/signup',
      type: 'application/json',
      data: user,
    }).then((res) => {
      $modalInstance.close('close');
      if (res.data === 'incorrect') {
        $scope.invalidLogin('invalidSignup');
      }
    });
  };
})

.controller('InvalidLogin', function($scope, $modalInstance) {
  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  };
});
