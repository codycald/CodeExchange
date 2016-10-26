/*global angular*/
angular.module('stackoverflowclone')
.controller('registerCtrl', function($scope, $location) {
    
    $scope.register = function() {
        $location.path('/');
    }
    
});