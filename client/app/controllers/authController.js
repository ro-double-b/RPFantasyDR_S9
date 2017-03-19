angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal, $rootScope, $http, Auth, Authorization) {
  $scope.selectedLanguages = [];
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
  $rootScope.logout = function () {
    const selection = {
      test: 'hi'
    }
    return $http({
      method: 'POST',
      url: 'api/logout',
      type: 'application/json',
      data: selection,
    })
    .then((res) => {
      Auth.isLoggedIn = false;
      $scope.authorized = false;
      Authorization.go('login');
    })
  }
})

.service('Authorization', function($state) {
  this.authorized = false;

  const clear = () => {
    this.authorized = false;
  };

  const go = (fallback) => {
    this.authorized = true;
    $state.go(fallback);
  };

  return {
    authorized: this.authorized,
    clear,
    go,
  };
});
