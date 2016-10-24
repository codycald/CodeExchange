/*global angular*/
angular.module('stackoverflowclone')
.controller('questionCtrl', function($scope, dataService, $routeParams) {
    $scope.question = dataService.getQuestionById($routeParams.id);
});
