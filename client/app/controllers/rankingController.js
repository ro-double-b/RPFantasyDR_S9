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
      console.log(res.data)
      $scope.ranking = res.data;
    });
  };
  $scope.sortType = 'name';
  $scope.sortRevers = false;
  $scope.serachUser = ''
});
