angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal, $rootScope) {
  $scope.selectedLanguages = [];
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
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
