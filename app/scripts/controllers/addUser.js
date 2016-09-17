(function(){

  'use strict';
  angular.module('app.login')
  .controller('AddUserCtrl', AddUserCtrl);

  function AddUserCtrl($log, $scope, $rootScope, $cookieStore, AuthService, $http){

    $log.log("Add User controller");

     $scope.addUser = function(){
       $log.log("Adding User");
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
       var data =
         {
           "first_name": $scope.addUserForm.firstname,
           "last_name": $scope.addUserForm.lastname,
           "username": $scope.addUserForm.username,
           "email": $scope.addUserForm.email,
           "is_staff": $scope.addUserForm.is_staff,
           "is_superuser": $scope.addUserForm.is_superuser,
           "profile": {
             "contact_number": "",
             "status_message": "",
             "bio": $scope.addUserForm.bio,
           },
           "authentications": [
             {
               "service_name": "",
               "key": "",
               "token": token,
             }
           ],
           "roles": "field"
         };

        //  $log.log("Add user payload", JSON.stringify(data));

         $http({
           method: 'post',
           url: '//userservice.staging.tangentmicroservices.com/api/v1/users/',
           data: data,
         }).then(function(response){
           $log.log("New user added");
           $log.log(response, AuthService.getNewUser(response));
           AuthService.setNewUser(response);

         }, function(response){
           var msg ;
           if(response.status === 409){
             msg = 'Account already exists';

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
