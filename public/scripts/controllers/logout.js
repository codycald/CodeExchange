/*global angular*/
angular.module('stackoverflowclone')
.controller('logoutCtrl', function($scope, $location, authService, sessionService) {
    
    $scope.logout = function() {
        authService.logout()
        .then(function(res) {
            sessionService.clearSession();
            $scope.setUser(null);
            $location.path('/');
        });
    };
    
});