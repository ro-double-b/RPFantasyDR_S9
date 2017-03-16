angular.module('fantasyDragRace')
.controller('RankingController', function($scope, $window, $http) {

  $scope.weeks = 13;
  $scope.createHeading = function() {
    const heading = ['Ranking', 'Username'];
    for (let i = 1; i <= $scope.weeks; i++) {
      heading.push(`Week ${i}`);
    }
    heading.push('Total');
    return heading;
  };

  $scope.heading = $scope.createHeading();
  $scope.init = function() {
    return $http({
      method: 'GET',
      url: 'api/ranking',
    })
    .then((res) => {
      $scope.ranking = res.data;
    });
  };
});
