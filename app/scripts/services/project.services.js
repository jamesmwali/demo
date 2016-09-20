'use strict';

angular.module('app.login')

.factory('ProjectService',
    ['$log', '$rootScope', '$location', '$http', '$window', '$cookieStore',
    function ($log, $rootScope, $location, $http, $window, $cookieStore, $q) {


      var service = {};
      var data;

      service.editProject = function(pk){

        var defer = $q.defer();
        var url = '//projectservice.staging.tangentmicroservices.com/api/v1/projects/'+pk+'/',


        $http({
                method: 'put',
                url: url
             }).success(function(response){
                console.log("Fetching project Info ");
                  defer.resolve(response);
             }).error(function(err, status){
                console.log("Oops something went wrong");
                  defer.reject(err);

             });


        return defer.promise;

      }

      service.getProject = function(pk){

        var defer = $q.defer();
        var url = '//projectservice.staging.tangentmicroservices.com/api/v1/projects/'+pk+'/',


        $http({
                method: 'get',
                url: url
             }).success(function(response){
                console.log("Fetching project ");
                  defer.resolve(response);
             }).error(function(err, status){
                console.log("Oops something went wrong");
                  defer.reject(err);

             });


        return defer.promise;

        }


        service.editProjectV1 = function(pk){

              var defer = $q.defer();
              var url = '//projectservice.staging.tangentmicroservices.com/api/v1/projects/'+pk+'/',


              $http({
                      method: 'patch',
                      url: url
                   }).success(function(response){
                      console.log("edited project ");
                        defer.resolve(response);
                   }).error(function(err, status){
                      console.log("Oops something went wrong");
                        defer.reject(err);

                   });


              return defer.promise;

        }


        service.deleteProject = function(pk){

                var defer = $q.defer();
                var url = '//projectservice.staging.tangentmicroservices.com/api/v1/projects/'+pk+'/',

                $http({
                        method: 'delete',
                        url: url
                     }).success(function(response){
                        console.log("Deleted project ");
                          defer.resolve(response);
                     }).error(function(err, status){
                        console.log("Oops something went wrong");
                          defer.reject(err);

                     });

                return defer.promise;
              }

      return service;

    }])
