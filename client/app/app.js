angular.module('fantasyDragRace', [
  'ui.router',
  'ui.bootstrap',
])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

    .state('login', {
      url: '/',
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
    })
  })

  .run(function($rootScope, $state, $location, Authorization) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      if(Authorization.authorized) {
        return;
      } else {
        $state.go('login');
        event.preventDefault();
        return
      }
    });
  });
