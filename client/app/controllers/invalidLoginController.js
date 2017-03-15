angular.module('fantasyDragRace')
.controller('InvalidLogin', function($scope, $modalInstance) {
  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  };
});
