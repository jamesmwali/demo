(function(){
    'use strict',
      angualar
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

        function LoginCtrl($http, $q, $log, $location, $scope, $rootScope, $window,
          myConfig, AuthService){

            $scope.login = function(){
                var user;

                $log.log("Running login Ctrl");

                if($scope.loginform.username && $scope.loginform.password){

                  AuthService.login($scope.loginform.username, $scope.loginform.password)
                  .then(function(response){
                    $log.log("login Response", response);
                    if(response){
                      $log.log("Response ----");
                      successfulLogin(response);
                    }else{
                      $scope.loginErrorMsg = 'Your username and password do not match';
                    }

                  }, function(response){
                    $log.log("Error res", response);
                  })
                }
            }; //login


            function successfulLogin(response){
              $log.log("successfulLogin !!!");

              var data = response.data;

              var currentUser = {
                username: data.username,
                password: data.password,
              }

            }

          }




})
