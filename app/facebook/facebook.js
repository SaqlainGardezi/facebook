'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])
.config( function($facebookProvider){
    $facebookProvider.setAppId('1403033816385174');
    $facebookProvider.setPermissions("email", "public_profile", "user_posts","publish_actions", "user_photos");
})

.run(function($rootScope){
     (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); 
})

.controller('FacebookCtrl', ['$scope','$facebook', function($scope, $facebook) {
    $scope.isLoggedIn=false;

    $scope.login=function(){
        $facebook.login().then(function(){
            $scope.isLoggedIn=true;
            refresh();
        });
    };

    $scope.logout=function(){
        $facebook.logout().then(function(){
            $scope.isLoggedIn=false;
            refresh();
        });
    };


    function refresh(){
        $facebook.api('/me?fields=first_name, last_name,  email, gender, locale').then(function(response){
            $scope.welcomeMsg= "Welcome " + response.name;
            $scope.isLoggedIn=true;
            $scope.userInfo=response;
        },
        function(err){
            $scope.welcomeMsg="Please Log In";
        });
    }

    refresh();
}]);