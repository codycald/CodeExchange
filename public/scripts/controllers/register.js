/*global angular*/
angular.module('stackoverflowclone')
.controller('registerCtrl', function($scope, $location, authService) {
    
    $scope.register = function() {
        authService.register({username: $scope.username, password: $scope.password})
        .then(function(user) {
            $scope.setUser(user);
        }, function() {
            console.log('Error: could not register');
        });
    };
    
});