angular.module('fantasyDragRace', [
  'ui.router',
  'ui.bootstrap',
])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
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
    .state('home', {
      url: '/home',
      views: {
        '': { templateUrl: './app/views/index.html',
      },
        'landing@home': {
          templateUrl: './app/partials/signedIn/landing.html',
          controller: 'AuthController',
        },
        'navbar@home': {
          templateUrl: './app/partials/signedIn/navbar.html',
        },
        'about@home': {
          templateUrl: './app/partials/about.html',
        },
        'rules@home': {
          templateUrl: './app/partials/rules.html',
        },
        'selection@home': {
          templateUrl: './app/partials/signedIn/selection.html',
          controller: 'SelectionController',
        },
        'rankings@home': {
          templateUrl: './app/partials/rankings.html',
        },
        'aboutme@home': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    });
  });