angular
  .module('fantasyDragRace')
.controller("TestController", function($scope) {

    $scope.models = {
        selected: null,
        lists: {"Winner": [], "Runner-Up": [], "Bottom": [], "Eliminated": [], "Queens": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.Queens.push({label: "Item A" + i});
        
    }
    console.log($scope.models)
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});