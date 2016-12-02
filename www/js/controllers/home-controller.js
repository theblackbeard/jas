angular.module('starter')
    .controller('ride', function($scope, $ionicSideMenuDelegate, $state, AuthService){
        $scope.isAuthenticated = AuthService.isAuthenticated();
        $scope.toggleLeft = function(){
            $ionicSideMenuDelegate.toggleLeft();
        }
    })

    .controller('HomeCtrl', function($scope, $window, $state, AuthService){
        $scope.users = [];
        
        (function allUser(){
            
             AuthService.allUsers().then(function(users) {
                    console.log(users)
                    $scope.users = users; 
             });

        })();

         $scope.logout = function(){
           AuthService.logout();
           $state.go('home');
           $window.location.reload(true);
       }

    })

    .controller('PanelCtrl', function($scope, $state, AuthService){
       $scope.logout = function(){
           AuthService.logout();
           $state.go('home');
       }

    })