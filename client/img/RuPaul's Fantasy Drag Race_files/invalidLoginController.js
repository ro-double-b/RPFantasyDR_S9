angular.module('fantasyDragRace')
.controller('InvalidLogin', function($scope, $modalInstance) {
  $scope.selectedLanguages = [];
  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  };
});
