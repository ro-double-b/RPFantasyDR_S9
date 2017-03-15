angular
  .module('fantasyDragRace')
.controller('TestController', function($scope) {
  $scope.groups = [
    {
      name: 'Group 1',
      items: []
    },
    {
      name: 'Group 2',
      items: []
    },
    {
      name: 'Group 3',
      items: []
    }
  ];
  
  $scope.items = [
    {
      id: 1,
      name: 'Item 1'
    },
    {
      id: 2,
      name: 'Item 3'
    },
    {
      id: 3,
      name: 'Item 4'
    }
  ];
});