(function(){

  'use strict';
  angular.module('app.login')
  .controller('AddUserCtrl', AddUserCtrl);

  function AddUserCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http){

    $log.log("Add User controller");

     $scope.addProject = function(){
       $log.log("Adding Project");
       /*

       {
         "id": 0,
         "first_name": "",
         "last_name": "",
         "username": "",
         "email": "email",
         "is_staff": false,
         "is_superuser": false,
         "profile": {
           "contact_number": "",
           "status_message": "",
           "bio": ""
         },
         "authentications": [
           {
             "id": 0,
             "service_name": "",
             "key": "",
             "token": ""
           }
         ],
         "roles": "field"
       }
       */
       var token = AuthService.getToken();
      //  var data =
      //    {
      //      "id":"",
      //      "first_name": $scope.addUserForm.firstname,
      //      "last_name": $scope.addUserForm.lastname,
      //      "username": $scope.addUserForm.username,
      //      "email": $scope.addUserForm.email,
      //      "is_staff": $scope.addUserForm.is_staff,
      //      "is_superuser": $scope.addUserForm.is_superuser,
      //      "profile": {
      //        "contact_number": "",
      //        "status_message": "",
      //        "bio": $scope.addUserForm.bio,
      //      },
      //      "authentications": [
      //        {
      //          "id": "",
      //          "service_name": "",
      //          "key": "",
      //          "token": token,
      //        }
      //      ],
      //      "roles": "field"
      //    };

      var data =
      {
        "pk": 0,
        "title": $scope.title,
        "description": $scope.description,
        "start_date": $scope.start_date,
        "end_date": $scope.end_date,
        "is_billable": $scope.billable,
        "is_active": $scope.active,
        "task_set": [
          {
            "id": 0,
            "title": "",
            "due_date": "date",
            "estimated_hours": "decimal",
            "project": "field",
            "project_data": {
              "pk": 0,
              "title":$scope.title,
              "description": $scope.description,
              "start_date": $scope.start_date,
              "end_date": "$scope.end_date",
              "is_billable": $scope.billable,
              "is_active": $scope.billable
            }
          }
        ],
        "resource_set": [
          {
            "id": "",
            "user": "",
            "start_date": "date",
            "end_date": "date",
            "rate": "float",
            "agreed_hours_per_month": "decimal",
            "created": "datetime",
            "updated": "datetime",
            "project": "field"
          }
        ]
        }
        //  $log.log("Add user payload", JSON.stringify(data));

         $http({
           method: 'post',
          //  url: '//userservice.staging.tangentmicroservices.com/api/v1/users/',
           url: '//projectservice.staging.tangentmicroservices.com:80/api/v1/projects/',
           data: data,
         }).then(function(response){

           $log.log("New project added");
           $log.log(response, AuthService.getNewUser(response));
           AuthService.setNewUser(response);

         }, function(response){
           var msg ;
           if(response.status === 409){
             msg = 'Project already exists';

             $scope.addUserError = msg;
           }
           if(response.status === 401){
             msg = "Authentication credentials were not provided.";
             $scope.addUserError = msg;
           }
         });

     };  //end of add user ;




  }





})();
