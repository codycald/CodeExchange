/*global angular*/
angular.module('stackoverflowclone')
.controller('loginCtrl', function($scope, $location, authService, alertService) {
    
    $scope.login = function() {
        authService.login({username: $scope.username, password: $scope.password})
        .then(function(user) {
            $location.path('/');
        }, function(res) {
            alertService.alert('danger', 'Invalid username or password');
        });
    };
    
});