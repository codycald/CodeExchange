/*global angular*/
angular.module('stackoverflowclone')
.controller('loginCtrl', function($scope, $location) {
    
    $scope.login = function() {
        $location.path('/');
    }
    
});