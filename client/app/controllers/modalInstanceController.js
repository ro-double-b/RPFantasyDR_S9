angular.module('fantasyDragRace')
.controller('ModalInstanceController', function($scope, $modalInstance, $http, $modal, Authorization) {
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.invalidLogin = function(type) {
    $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
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
      $modalInstance.close();
      if (res.data === "incorrect") {
        $scope.invalidLogin('invalidLogin');
      } else {
        Authorization.go('private');
      }
    });
  };
  $scope.signup = function(user) {
    console.log(user)
    return $http({
      method: 'POST',
      url: 'api/signup',
      type: 'application/json',
      data: user,
    }).then((res) => {
      $modalInstance.close();
      if (res.data === 'incorrect') {
        $scope.invalidLogin('invalidSignup');
      } else {
        Authorization.go('private');
      }
    });
  };
})


.service('Authorization', function($state) {

  this.authorized = false,
  this.memorizedState = null;

  var
  clear = function() {
    this.authorized = false;
    this.memorizedState = null;
  },

  go = function(fallback) {
    this.authorized = true;
    var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go
  };
});
