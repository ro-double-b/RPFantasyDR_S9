angular.module('fantasyDragRace')
.controller('ResultsController', function($scope, $window, $http) {

  $scope.submitWeeklyResult = function(resultObj) {
    const selection = {
      weekID: resultObj.week,
      winnerID: resultObj.winner.queenID,
      runnerUpID: resultObj.runnerUp.queenID,
      bottomID: resultObj.bottom.queenID,
      eliminatedID: resultObj.eliminated.queenID,
    };
    return $http({
      method: 'POST',
      url: 'api/resultWeeklySubmission',
      type: 'application/json',
      data: selection,
    });
  };

  $scope.submitTopThreeResult = function(resultObj) {
    const selection = {
      winnerID: resultObj.winner.queenID,
      runnerUpID: resultObj.runnerUp.queenID,
      topThreeID: resultObj.topThree.queenID,
    };
    return $http({
      method: 'POST',
      url: 'api/resultTopThreeSubmission',
      type: 'application/json',
      data: selection,
    });
  };

  $scope.submitTootResult = function(resultObj) {
    const selection = {
      weekID: resultObj.week,
      selectionRaven: resultObj.raven,
      selectionRaja: resultObj.raja,
    };
    return $http({
      method: 'POST',
      url: 'api/resultTootSubmission',
      type: 'application/json',
      data: selection,
    });
  };

  $scope.queens = [
      { queenID: 1,
        name: "Aja",
        entrance: "Your edges are officially snatched",
        age: 22,
        hometown: "Brooklyn",
      },
      { queenID: 2,
        name: "Alexis Michelle",
        entrance: "How do you like them egg rolls, Mr. Charles?",
        age: 33,
        hometown: "New York City",
      },
      { queenID: 3,
        name: "Charlie Hides",
        entrance: "Hi, hi, hi! It's about to get shady up in here!",
        age: 52,
        hometown: "London",
       },
      { queenID: 4,
        name: "Eureka OHara",
        entrance: "Give it up for the big girl! Serving pure catfish",
        age: 25,
        hometown: "Johnson City, TN",
      },
      { queenID: 5,
        name: "Farrah Moan",
        entrance: "So this is what it looks like",
        age: 23,
        hometown: "Las Vegas",
      },
      { queenID: 6,
        name: "Jaymes Mansfield",
        entrance: "Hi shapeshifters!",
        age: 26,
        hometown: "Madison, WI",
      },
      { queenID: 7,
        name: "Kimora Blac",
        entrance: "Is it me or is it hot in here?",
        age: 28,
        hometown: "Las Vegas",
      },
      { queenID: 8,
        name: "Nina BoNina Brown",
        entrance: "I'm Nina, Bo'nina, Banana, Fofana, Osama, Bin Laden Brown! Boom boom boom boom",
        age: 34,
        hometown: "Alanta",
      },
      { queenID: 9,
        name: "Peppermint",
        entrance: "Heeey!",
        age: 37,
        hometown: "New York City",
      },
      { queenID: 10,
        name: "Sasha Velour",
        entrance: "AHHHHH!?",
        age: 29,
        hometown: "Brooklyn",
      },
      { queenID: 11,
        name: "Shea Coulee",
        entrance: "My name is Shea Couleé and I didn't come to play, I came to slay",
        age: 27,
        hometown: "Chicago",
      },
      { queenID: 12,
        name: "Trinity Taylor",
        entrance: "The body is here, bitches!",
        age: 31,
        hometown: "Orlando",
      },
      { queenID: 13,
        name: "Valentina",
        entrance: "Hello, it's me... Valentina!",
        age: 25,
        hometown: "Los Angeles",
      },
  ];
});
