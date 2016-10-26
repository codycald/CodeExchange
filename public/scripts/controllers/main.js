/*global angular*/
angular.module('stackoverflowclone')
.controller('mainCtrl', function($scope, $http, authService) {
    $scope.user = null;
    $scope.isLoggedIn = authService.isLoggedIn();
    
    $scope.setUser = function(user) {
        $scope.user = user;
        $scope.isLoggedIn = authService.isLoggedIn();
    }
    
});