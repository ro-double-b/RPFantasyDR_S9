angular.module('fantasyDragRace', [
  'ui.router',
  'ui.bootstrap',
])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

    .state('login', {
      url: '/',
      data: {
        requireLogin: false,
      },
      views: {
        '': { templateUrl: './app/views/index.html',
      },
        'landing@login': {
          templateUrl: './app/partials/signedOut/landing.html',
          controller: 'AuthController',
        },
        'navbar@login': {
          templateUrl: './app/partials/signedOut/navbar.html',
        },
        'about@login': {
          templateUrl: './app/partials/about.html',
        },
        'rules@login': {
          templateUrl: './app/partials/rules.html',
        },
        'selection@login': {
          templateUrl: './app/partials/signedOut/selection.html',
          controller: 'SelectionController',
        },
        'rankings@login': {
          templateUrl: './app/partials/rankings.html',
        },
        'aboutme@login': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    })
    .state('private', {
      url: '/home',
      data: {
        requireLogin: true,
      },
      views: {
        '': { templateUrl: './app/views/index.html',
      },
        'landing@private': {
          templateUrl: './app/partials/signedIn/landing.html',
          controller: 'AuthController',
        },
        'navbar@private': {
          templateUrl: './app/partials/signedIn/navbar.html',
        },
        'about@private': {
          templateUrl: './app/partials/about.html',
        },
        'rules@private': {
          templateUrl: './app/partials/rules.html',
        },
        'selection@private': {
          templateUrl: './app/partials/signedIn/selection.html',
          controller: 'SelectionController',
        },
        'rankings@private': {
          templateUrl: './app/partials/rankings.html',
        },
        'aboutme@private': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    });
  })

.factory('Auth', function() {
  return {
    isLoggedIn: false,
  }; })
.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.auth = Auth;
}])

  .run(function ($rootScope, $state, $location, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      // not logged in yet
      const shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !Auth.isLoggedIn;
      if (shouldLogin) {
        $state.go('login');
        event.preventDefault();
        return;
      }
      // logged in
      if (Auth.isLoggedIn) {
        const shouldGoToMain = fromState.name === ""
          && toState.name === "private";
        if (shouldGoToMain) {
          $state.go('private');
          event.preventDefault();
        }
        return;
      }
    });
  });
