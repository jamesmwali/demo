'use strict';

angular.module('app.login')

.factory('ProjectService',
    ['$log', '$rootScope', '$location', '$http', '$window', '$cookieStore',
    function ($log, $rootScope, $location, $http, $window, $cookieStore, $q) {


      var service = {};
      var data;

      service.editProject = function(pk, data){

        var url = '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+ pk +'/';

        return $http({
                method: 'put',
                url: url,
                data: data
             }).then(function(response){
                console.log("Edited project Successfully ", response);
                  // defer.resolve(response);
                  return response
             },function(err){
                console.log("Oops something went wrong", err);
                  // defer.reject(err);
                  if(err.data.detail === "No such user"){

                    $location.path("/login");
                  }

             });

      }

      service.getProject = function(pk){
        var url = '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+pk+'/';


          return $http({
                  method: 'get',
                  url: url,
                  data: data
               }).then(function(response){
                  console.log("Fetched project Successfully ", response);
                    // defer.resolve(response);
                    return response
               },function(err){
                  console.log("Oops something went wrong", err);
                    // defer.reject(err);
                    if(err.data.detail === "No such user"){

                      $location.path("/login");
                    }
               });

        }


        service.editProjectV1 = function(pk, data){

              var defer = $q.defer();
              var url = '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+pk+'/';


              return $http({
                      method: 'patch',
                      url: url,
                      data: data
                   }).then(function(response){
                      console.log("Edited project Successfully ", response);
                        // defer.resolve(response);
                        return response
                   },function(err){
                      console.log("Oops something went wrong", err);
                      if(err.data.detail === "No such user"){

                        $location.path("/login");
                      }
                        // defer.reject(err);

                   });

        }


        service.deleteProject = function(pk){

                var url = '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+pk+'/';

                return $http({
                        method: 'delete',
                        url: url,
                        data: data
                     }).then(function(response){
                        console.log("Deleted project Successfully ", response);
                          // defer.resolve(response);
                          return response
                     },function(err){
                        console.log("Oops something went wrong", err);
                        if(err.data.detail === "No such user"){

                          $location.path("/login");
                        }
                          // defer.reject(err);

                     });
              }


              service.getNewProject = function(){
                return service.new_project || null;
              };
              service.setNewProject = function(obj){
                service.new_project = obj;
              };

              service.getNewPk = function(){
                return service.new_pk || null;
              };

              service.setNewPk = function(obj){
                service.new_pk = obj;
              };

              service.getProjName = function(){
                return service.new_name || null;
              };

              service.setProjName = function(obj){
                service.new_name = obj;
              };

              service.getProjDesc = function(){
                return service.new_desc || null;
              };

              service.setProjDesc = function(obj){
                service.new_desc = obj;
              };

      return service;

    }])
