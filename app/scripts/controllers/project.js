(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectCtrl', ProjectCtrl);

  function ProjectCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http, ProjectService, $window){

    $scope.activeAddProject = function(){

        if($scope.AddProjectForm === true){
          $scope.AddProjectForm = false;

        }else {
          $scope.AddProjectForm = true;
          $scope.DelProjectForm = false;
          $scope.EditProjectForm = false;

        }

    };
    $scope.activeDelProject = function(){

      if($scope.DelProjectForm === true){
        $scope.DelProjectForm = false;

      }else {
        $scope.DelProjectForm = true;
        $scope.EditProjectForm = false;
        $scope.AddProjectForm = false;

      }

    };

    $scope.activeEditProject = function(){

      if($scope.EditProjectForm === true){
        $scope.EditProjectForm = false;

      }else {
        $scope.EditProjectForm = true;
        $scope.DelProjectForm = false;
        $scope.AddProjectForm = false;

      }

    };

    $log.log("Add Project controller");

     $scope.addProject = function(){
       $log.log("Adding Project");

       var token = AuthService.getToken();


       var data =
        {
          "title": $scope.Title,
          "description": $scope.Description,
          "start_date": $scope.start_date,
          "end_date": $scope.end_date,
          "is_billable": $scope.billable,
          "is_active": $scope.active,
          "task_set": [],
          "resource_set": []
        }

          $log.log("Add project payload", JSON.stringify(data));

         $http({
           method: 'post',
           url: '//projectservice.staging.tangentmicroservices.com/api/v1/projects/',
           data: data,
         }).then(function(response){

           if(response){
           $log.log("New project added");
           $log.log("Response", response);

          $scope.SuccessMessage = "Project has been created";

            ProjectService.setNewPk(response.data.pk);
            ProjectService.setProjName(response.data.title);
            ProjectService.setProjDesc(response.data.description);
            ProjectService.setNewProject(response.data);


            var project = ProjectService.getNewProject();
            $window.localStorage.Newproject = JSON.stringify(project);
          }

         }, function(response){

            var msg = "Authentication credentials were not provided.";
             $scope.addProjectError = msg;

         });
         //


     };  //end of add project ;




  }





})();
