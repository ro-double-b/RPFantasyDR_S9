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
      } else {
        $rootScope.user = user.username;
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
        $rootScope.user = user.name;
        angular.element(document).find('#logout').removeClass('hideLogout');
        $state.go('private');
      }
    });
  };
  $scope.createTeam = function(teamInfo) {
    if ($rootScope.user !== undefined) {
      $modalInstance.close();
      $scope.invalidLogin('invalidLogin');
    } else {
      return $http({
        method: 'POST',
        url: 'api/createTeam',
        type: 'application/json',
        data: teamInfo,
      })
      .then((res) => {
        $modalInstance.close();
        if (res.data === 'incorrect') {
          $scope.invalidLogin('invalidTeam');
        } else {
          $modal.open({
            templateUrl: `./app/partials/modals/teamCreated.html`,
            controller: 'InvalidLogin',
          });
        }
      });
    }
  };
  $scope.joinTeam = function(teamInfo) {
    if ($rootScope.user !== undefined) {
      $modalInstance.close();
      $scope.invalidLogin('invalidLogin');
    } else {
      return $http({
        method: 'POST',
        url: 'api/joinTeam',
        type: 'application/json',
        data: teamInfo,
      })
      .then((res) => {
        $modalInstance.close();
        if (res.data === 'incorrect') {
          $scope.invalidLogin('invalidTeam');
        } else {
          $modal.open({
            templateUrl: `./app/partials/modals/joinTeam.html`,
            controller: 'InvalidLogin',
          });
        }
      });
    }
  };
})
