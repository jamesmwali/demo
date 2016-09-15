(function(){


    'use strict';
        angular.module('app.login')
        .controller('LoginCtrl', LoginCtrl);

        function LoginCtrl($http, $log, $location, $scope, $rootScope, $window, AuthService) {

            $scope.login = function(){
                var user;

                $log.log("Running login Ctrl");

                if($scope.username && $scope.password){

                  AuthService.login($scope.username, $scope.password)
                  .then(function(response){
                    $log.log("login Response", response);
                    if(response.status === 200){
                      $log.log("Response ----");
                      successfulLogin(response);
                    }else{
                      $scope.loginErrorMsg = 'Your username and password do not match';
                    }

                  }, function(response){
                    $log.log("Error res", response);
                  })
             }; //login


            function successfulLogin(response){
              $log.log("successfulLogin !!!");

              var data = response.data;

              var currentUser = {
                username: data.username,
                password: data.password,
              };

            $scope.current_user = current_user;
            $rootScope.isLogged = true;
            $log.log(current_user);
            $rootScope.currentUser = current_user;

            $window.localStorage.currentUser = JSON.stringify(current_user);
            StorageService.set("currentUser");
            AuthService.setToken(current_user);

            $log.log("Set user: ",StorageService.set("currentUser"));
            $log.log("Set token: ", AuthService.getToken());

            AuthService.setUser(JSON.stringify(current_user));

            $location.path('/view');

          }
        }
      } //

})();
