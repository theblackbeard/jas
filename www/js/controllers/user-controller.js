angular.module('starter')
 
 .controller('LoginCtrl', function($scope, $window, AuthService, $ionicPopup, $state) {
  $scope.user = {
    rgm: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('home');
      $window.location.reload(true);
    }, function(errMsg) {
        console.log(errMsg)
      var alertPopup = $ionicPopup.alert({
        title: 'Falha no Login!',
        template: errMsg
      });
    });
  };
})

.controller('UserInfoCtrl', function($scope, $stateParams, $ionicPopup, AuthService){
    $scope.user = {};
    AuthService.getUser($stateParams.id).then(function(user) {
        $scope.user = user;
    }, function(errMsg) {
        console.log(errMsg)
      
    });

    $scope.simulation = function(){
      if($scope.user.name === 'Carlos Mateus Carvalho'){
          var alertPopup = $ionicPopup.alert({
          title: 'Ops...!',
          template: 'Não pode solicitar carona para você mesmo!'
        });
      }else{
         var alertPopup = $ionicPopup.alert({
          title: 'Sucesso!',
          template: 'Seu pedido de carona foi enviado, aguarde confirmação.'
        });
          $scope.user.registry.rideTake += 1;
      }
       
    }

})
 