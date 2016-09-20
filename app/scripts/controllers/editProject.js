(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectEditCtrl', ProjectEditCtrl);

  function ProjectEditCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http, ProjectService){


    var createdProject = ProjectService.getNewProject();
    $log.log("Project Created", createdProject);

    if(createdProject){



    };


    $scope.projectEdit = function(){


      if($scope.pk!=="" && $scope.Title!== "" && $scope.Description && $scope.start_date!== ""){

        var pk = $scope.pk;
        var data = {
          "pk": $scope.pk,
          "title": $scope.Title,
          "description": $scope.Description,
          "start_date": $scope.start_date,
          "end_date": $scope.end_date,
          "is_billable": $scope.billable,
          "is_active": $scope.active,
        };

        ProjectService.editProject($scope.pk, data).
        then(function(response){
          if(response){
            $log.log("Project Changed Successfully");
            $log.log(response);
            $scope.SuccessMessage = "Project Changed Successfully";
          }else{
            $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";
          }
        }, function(response){
            $log.log("failed", response);
            $scope.Errormsg = "Primary Key is Invalid/ Does not exist, Try Again";

        });

      }else {

          $scope.Required = "PK, Title, Description And Start Date Are Required";
      }

    }; // edit project controller




  }

})();
