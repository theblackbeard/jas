// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })

      .state('login', {
        url: '/login', 
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('panel', {
        url: '/panel',
        templateUrl: 'templates/panel.html',
        controller: 'PanelCtrl'
      })

      .state('info', {
        url: '/info/:id',
        templateUrl: 'templates/info.html',
        controller: 'UserInfoCtrl'
      })

      $urlRouterProvider.otherwise('/');
})
.run(function($rootScope, $state, AuthService, AUTH_EVENTS, $ionicPlatform) {

    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(AuthService.isAuthenticated());
      console.log(next.name);
      if (next.name === 'panel' || next.name === 'info' ) {
        event.preventDefault();
        $state.go('login');
      }
    }else{
      if(next.name === 'login'){
        event.preventDefault();
        $state.go('panel');
      }
    }
  });


})
