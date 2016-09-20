(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectDelCtrl', ProjectDelCtrl);

  function ProjectDelCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http, ProjectService){


        $scope.deleteProject = function(){


          if($scope.pk!=="" || $scope.pk!== "undefined"){

            var pk = $scope.pk;
            var data = {
              "pk": $scope.pk,
            };

            ProjectService.deleteProject($scope.pk, data).
            then(function(response){
              if(response){
                $log.log("Project Deleted Successfully");
                $log.log(response);
                $scope.SuccessMessage = "Project Deleted Successfully";
              }else{
                $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";
              }
            }, function(response){
                $log.log("failed", response);
                $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";

            });

          }else {

              $scope.Required = "Project Primary Key (PK) is Required";
          }

        };



  }

})();
