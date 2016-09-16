// (function () {
//     'use strict';
//
//     angular.module('app.login')
//         .service('AuthService', AuthService);
//
//
//         function AuthService($log, $rootScope, $location, $http, $window){
//           var service = {};
//           var user;
//
//           if(this.currentUser === undefined)
//           service.currentUser = {};
//
//           service.isUserDefined = function(){
//             user = JSON.parse($window.localStorage.currentUser || null);
//             $log.log("User", isUserDefined);
//             if(!user) {
//
//               $location.path("/");
//             } else{
//               $rootScope.currentUser = user;
//               $rootScope.loginClass = "";
//             }
//           } ;
//
//           service.setUser = function(user){
//
//             $log.log("Setting new user");
//
//             // persistant
//             $window.localStorage.currentUser = JSON.stringify(user);
//             $cookieStore.put('globals', user);
//
//             //won't be retained after refresh
//             service.currentUser = user;
//             $rootScope.currentUser = user;
//
//
//           };
//
//           service.login = function(username, password){
//
//               //Request payload
//
//               var data = {};
//
//               data = {
//
//                 'username': username,
//                 'password': password,
//               };
//
//               $log.log($http.headers);
//
//               return $http({
//
//                 method: 'post',
//                 url: '//userservice.staging.tangentmicroservices.com:80/api­token­auth/',
//                 data: data,
//
//               }).then(function(response) {
//
//                 // Setting the token to be used in the request
//                 $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
//                 $log.log("Testing token:", response.data);
//                 $log.log("Testing token 2:", response.token);
//
//                 user = response.data;
//                 return response;
//
//               }, function(response){
//                 $log.log("response", response);
//               }); // login
//
//           };
//
//           service.setToken = function(token){
//           service.token = token;
//          };
//
//
//          return service;
//
//         }

        'use strict';

        angular.module('app.login')

        .factory('AuthService',
            ['$log', '$rootScope', '$location', '$http', '$window', '$cookieStore',
            function ($log, $rootScope, $location, $http, $window, $cookieStore) {

              var service = {};
              var user;

              if(this.currentUser === undefined)
              service.currentUser = {};

              service.isUserDefined = function(){
                user = JSON.parse($window.localStorage.currentUser || null);
                $log.log("User", isUserDefined);
                if(!user) {

                  $location.path("/");
                } else{
                  $rootScope.currentUser = user;
                  $rootScope.loginClass = "";
                }
              } ;

              service.setUser = function(user){

                $log.log("Setting new user");

                // persistant
                $window.localStorage.currentUser = JSON.stringify(user);
                $cookieStore.put('globals', user);

                //won't be retained after refresh
                service.currentUser = user;
                $rootScope.currentUser = user;


              };

              service.login = function (username, password) {

                 var data = {};
                 data = {
                   'username': username,
                   'password': password,
                 }

                 return $http({
                    method: 'post',
                    url: '//userservice.staging.tangentmicroservices.com/api-token-auth/',
                    data: data,
                 }).then(function(response){

                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $log.log("Testing token:", response.data);
                    $log.log("Testing token 2:", response.token);

                    user = response.data;
                    return response;

                 }, function(res){
                  $log.log("failed ---", res);
                });

                // $http.post('//userservice.staging.tangentmicroservices.com/api-token-auth/', { username: username, password: password })
                //    .success(function (response) {
                //        $log.log("Service response -->",response);
                //    });

                };

              service.SetCredentials = function (username, password) {
                   var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: admin,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
               };

             service.ClearCredentials = function () {
              $rootScope.globals = {};
              $cookieStore.remove('globals');
              $http.defaults.headers.common.Authorization = 'Basic ';
            };


              service.setToken = function(token){
              service.token = token;
             };

              service.setToken = function(token){
              service.token = token;
            };
             service.getToken = function(){
              return service.token || null;
            };

                return service;
            }])
