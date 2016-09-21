(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectCtrl', ProjectCtrl)
  .controller('ProjectDelCtrl', ProjectDelCtrl)
  .controller('ProjectEditCtrl', ProjectEditCtrl)
  .controller('ViewProjectsCtrl', ViewProjectsCtrl);

  function ProjectCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http, ProjectService, $window){


      $scope.activeViewProject = function(){

        if($scope.projectForm === true){
          $scope.projectForm = false;

        }else {
          $scope.projectForm = true;
          $scope.EditProjectForm = false;
          $scope.DelProjectForm = false;
          $scope.AddProjectForm = false;

        }
      };

    $scope.activeAddProject = function(){

        if($scope.AddProjectForm === true){
          $scope.AddProjectForm = false;

        }else {
          $scope.AddProjectForm = true;
          $scope.DelProjectForm = false;
          $scope.EditProjectForm = false;
          $scope.projectForm = false;

        }

    };
    $scope.activeDelProject = function(){

      if($scope.DelProjectForm === true){
        $scope.DelProjectForm = false;

      }else {
        $scope.DelProjectForm = true;
        $scope.EditProjectForm = false;
        $scope.AddProjectForm = false;
        $scope.projectForm = false;


      }

    };

    $scope.activeEditProject = function(){

      if($scope.EditProjectForm === true){
        $scope.EditProjectForm = false;

      }else {
        $scope.EditProjectForm = true;
        $scope.DelProjectForm = false;
        $scope.AddProjectForm = false;
        $scope.projectForm = false;

      }

    };

    $log.log("Add Project controller");

     $scope.addProject = function(){
       $log.log("Adding Project");

       var token = AuthService.getToken();
  if($scope.pk!=="" && $scope.Title!== "" && $scope.Description && $scope.start_date!== ""){

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
        //   url: '//projectservice.staging.tangentmicroservices.com/api/v1/projects/',
           url : '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/',
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
       }else {


             $scope.Required = "PK, Title, Description And Start Date Are Required";


       }
         //


     };  //end of add project ;




  }

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

  function ViewProjectsCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http, ProjectService){


    $scope.viewProjects = function(){


    }; // view project controller

  }





})();
