var routerApp = angular.module('fantasyDragRace', [
  'ui.router'
  ]);

routerApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider  
    .state('home', {
      url: '/home',
      views: {
        '': { templateUrl: './app/views/home.html' 
      },
        'landing@home': { 
          templateUrl: './app/partials/landing.html' 
        },
        'navbar@home': { 
          templateUrl: './app/partials/navbar.html' 
        },
        'about@home': { 
          templateUrl: './app/partials/about.html' 
        },
        'rules@home': { 
          templateUrl: './app/partials/rules.html' 
        },
        'selection@home': { 
          templateUrl: './app/partials/selection.html'
          
        },
        'rankings@home': { 
          templateUrl: './app/partials/rankings.html' 
        },
        'aboutme@home': { 
          templateUrl: './app/partials/aboutme.html' 
        },
      }   
    });
});
