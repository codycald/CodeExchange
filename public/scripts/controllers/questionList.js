/*global angular*/
angular.module('stackoverflowclone')
.controller('questionListCtrl', function($scope, dataService) {
    $scope.questions = dataService.getQuestionList();
});
