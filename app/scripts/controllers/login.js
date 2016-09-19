(function(){


    'use strict';
        angular.module('app.login')
        .controller('LoginCtrl', LoginCtrl);

        function LoginCtrl($http, $log, $location, $scope, $rootScope, $window, AuthService, $cookieStore) {

            $scope.login = function(){

                $log.log("Running login Ctrl");

                if($scope.username!== '' && $scope.password!== ''){

                  AuthService.login($scope.username, $scope.password)
                  .then(function(response) {

                    if(response){
                      $log.log("login Response", response);
                      $log.log("Token after login --->", response.data);
                      AuthService.setToken(response.data);

                      $location.path('/view');
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
                username: $scope.username,
                password: $scope.password,
              };

            $scope.currentUser = currentUser;
            $rootScope.isLogged = true;
            $log.log(currentUser);
            $rootScope.currentUser = currentUser;

            $window.localStorage.currentUser = JSON.stringify(currentUser);
          //  StorageService.set("currentUser");


            //$log.log("Set user: ",StorageService.set("currentUser"));
            $log.log("Set token: ", AuthService.getToken());

            AuthService.setUser(JSON.stringify(currentUser));

          }
        }
      } //

})();
