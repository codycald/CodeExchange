/*global angular*/
angular.module('stackoverflowclone')
.controller('registerCtrl', function($scope, $location, authService, alertService) {
    
    $scope.register = function() {
        authService.register({username: $scope.username, password: $scope.password, email: $scope.email})
        .then(function(user) {
            $location.path('/');
        }, function(res) {
            alertService.alert('danger', res.data.message);
        });
    };
    
});