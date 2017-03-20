angular.module('fantasyDragRace')
.controller('ModalInstanceController', function($scope, $modalInstance, $http, $modal, $state, $rootScope) {
  $scope.selectedLanguages = [];
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.invalidLogin = function(type) {
    $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'InvalidLogin',
    });
  };

  $scope.switchModal = function(type) {
    $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
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
        console.log(user)
      } else {
        console.log(user)
        // $rootScope.user = res.data;
        angular.element(document).find('#logout').removeClass('hideLogout');
        $state.go('private');
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
      $modalInstance.close();
      if (res.data === 'incorrect') {
        $scope.invalidLogin('invalidSignup');
      } else {
        console.log(user)
        // $rootScope.user = user.username;
        angular.element(document).find('#logout').removeClass('hideLogout');
        $state.go('private');
      }
    });
  };
});
