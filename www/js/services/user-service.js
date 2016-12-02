angular.module('starter')
 
.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'tokenLocal';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
     $http.defaults.headers.common.Authorization = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  
  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/users/auth', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.msg);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
 
  var allUsers = function(){
      return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + '/users').then(function(result) {
        if (result.data.success) {
          resolve(result.data.users);
        } else {
          reject(result.data.users);
        }
      });
    });
  }

var getUser = function(id){
    console.log(id)
    return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + '/users/' + id).then(function(result) {
        if (result.data.success) {
          resolve(result.data.user);
        } else {
          reject(result.data.user);
        }
      });
    });
}


var getInfoUser = function(){
     return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + '/users/info').then(function(result) {
        if (result.data.success) {
          resolve(result.data.user);
        } else {
          reject(result.data.user);
        }
      });
    });
}

  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    allUsers: allUsers,
    getUser: getUser,
    getInfoUser: getInfoUser,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
 
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});