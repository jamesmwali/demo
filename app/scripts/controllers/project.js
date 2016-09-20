(function(){

  'use strict';
  angular.module('app.login')
  .controller('ProjectCtrl', ProjectCtrl);

  function ProjectCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http){

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
          //  $log.log(response, AuthService.getNewUser(response));
          //  AuthService.setNewUser(response);
          /*
          getProjDesc
          */
            $scope.message = "Project has been created";

            AuthService.setNewPk(response.data.pk);
            AuthService.setProjName(response.data.title);
            AuthService.setProjDesc(response.data.description);
            AuthService.setNewProject(response.data);

          }

         }, function(response){

            var msg = "Authentication credentials were not provided.";
             $scope.addProjectError = msg;

         });

     };  //end of add project ;




  }





})();
