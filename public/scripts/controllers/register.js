/*global angular*/
angular.module('stackoverflowclone')
.controller('registerCtrl', function($scope, $location, authService, alertService) {
    
    $scope.register = function() {
        authService.register({username: $scope.username, password: $scope.password})
        .then(function(user) {
            $location.path('/');
        }, function(res) {
            alertService.alert('danger', 'Username already taken. Please choose another.');
        });
    };
    
});