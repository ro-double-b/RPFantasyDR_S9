angular.module('fantasyDragRace')
.controller('RankingController', function($scope, $window, $http, $rootScope) {

  $scope.weeks = 13;
  $scope.createHeading = function() {
    const heading = ['Rank', 'User'];
    for (let i = 1; i <= $scope.weeks; i++) {
      heading.push(`${i}`);
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
      $scope.userRanking = null;
      $scope.userSumTotal = null;
      $scope.userInfo = "Sign in to see how you match up against other players.  ";

      if ($rootScope.userInfo !== undefined) {
        $scope.ranking.forEach((user) => {
          if ($rootScope.userInfo.username === user.username) {
            $scope.userSumTotal = user.sumTotal;
          }
        });
        $scope.userRanking = $scope.ranking.reduce((acc, user) => {
          if (user.sumTotal > $scope.userSumTotal) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
        $scope.userInfo = `Here is how you rank ${$rootScope.userInfo.name}.  
                           You have earned a total of ${$scope.userSumTotal} 
                           points and rank ${$scope.userRanking} out of 
                           ${$scope.ranking.length}.`;
      }
    });
  };
  $scope.sortType = '-sumTotal';
  $scope.serachUser = true;
});

