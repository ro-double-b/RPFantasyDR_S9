var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider  
    .state('home', {
      url: '/home',
      views: {
        '': { templateUrl: 'partial-home.html' },
        'landing@home': { templateUrl: './partials/landing.html' },
        'navbar@home': { templateUrl: './partials/navbar.html' },
        'about@home': { templateUrl: './partials/about.html' },
        'rules@home': { templateUrl: './partials/rules.html' },
        'selection@home': { templateUrl: './partials/selection.html' },
        'rankings@home': { templateUrl: './partials/rankings.html' },
        'aboutme@home': { templateUrl: './partials/aboutme.html' },
      }   
    });
});
