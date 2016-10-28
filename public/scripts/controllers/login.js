/*global angular*/
angular.module('stackoverflowclone')
.controller('loginCtrl', function($scope, $location, authService) {
    
    $scope.login = function() {
        authService.login({username: $scope.username, password: $scope.password})
        .then(function(user) {
            $location.path('/');
        }, function() {
            console.log('Error: could not login');
        });
    };
    
});