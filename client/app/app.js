angular.module('fantasyDragRace', [
  'ui.router',
  'ui.bootstrap',
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('mobile', {
      url: '/mobile',
      views: {
        '': { templateUrl: './app/views/index.html',
        },
        'landing@mobile': {
          templateUrl: './app/partials/mobile.html',
        },
        'about@mobile': {
          templateUrl: './app/partials/about.html',
        },
        'rules@mobile': {
          templateUrl: './app/partials/rules.html',
        },
        'selection@mobile': {
          templateUrl: './app/partials/signedOut/selection.html',
          controller: 'SelectionController',
        },
        'rankings@mobile': {
          templateUrl: './app/partials/rankings.html',
          controller: 'RankingController',
        },
        'aboutme@mobile': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    })
    // .state('processing', {
    //   url: '/processing',
    //   data: {
    //     requireLogin: false,
    //   },
    //   views: {
    //     '': { templateUrl: './app/views/index.html',
    //     },
    //     'landing@processing': {
    //       templateUrl: './app/partials/processing.html',
    //     },
    //   },
    // })
    .state('login', {
      url: '/login',
      views: {
        '': { templateUrl: './app/views/index.html',
        },
        // 'landing@login': {
        //   templateUrl: './app/partials/signedOut/landing.html',
        //   controller: 'AuthController',
        // },
        // 'navbar@login': {
        //   templateUrl: './app/partials/signedOut/navbar.html',
        //   controller: 'AuthController',
        // },
        // 'about@login': {
        //   templateUrl: './app/partials/about.html',
        // },
        // 'rules@login': {
        //   templateUrl: './app/partials/rules.html',
        // },
        'selection@login': {
          templateUrl: './app/partials/signedOut/selection.html',
          controller: 'SelectionController',
        },
        // 'rankings@login': {
        //   templateUrl: './app/partials/rankings.html',
        //   controller: 'RankingController',
        // },
        // 'aboutme@login': {
        //   templateUrl: './app/partials/aboutme.html',
        // },
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
          controller: 'RankingController',
        },
        'aboutme@private': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    })
    .state('results', {
      url: '/results',
      data: {
        requireLogin: false,
      },
      views: {
        '': { templateUrl: './app/views/index.html',
      },
        'resultForm@results': {
          templateUrl: './app/partials/resultForm.html',
          controller: 'ResultsController',
        },
      },
    });
    $locationProvider.html5Mode(true);
  });