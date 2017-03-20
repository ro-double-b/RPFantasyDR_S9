angular.module('fantasyDragRace')
.controller('AuthController', function($scope, $modal, $rootScope, $http, $state) {
  $scope.selectedLanguages = [];
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };
  $scope.mobileDetection = function (bool) {
    if (bool) {
      $state.go('mobile');
    }
  }
  $rootScope.logout = function () {
    return $http({
      method: 'POST',
      url: 'api/logout',
      type: 'application/json',
    })
    .then((res) => {
      $scope.authorized = false;
      $state.go('login');
    })
  }
})

// .service('Authorization', function($state) {
//   // this.authorized = false;

//   // const clear = () => {
//   //   this.authorized = false;
//   // };

//   const go = (fallback) => {
//     this.authorized = true;
//     $state.go(fallback);
//   };

//   return {
//     // authorized: this.authorized,
//     // clear,
//     go,
//   };
// });
