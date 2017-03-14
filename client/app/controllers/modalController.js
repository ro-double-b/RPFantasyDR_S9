angular.module('fantasyDragRace')
.controller('ModalController', function($scope, $window, $modal) {
  $scope.showForm = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/${type}.html`,
    });
  };
});
