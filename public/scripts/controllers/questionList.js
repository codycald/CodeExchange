/*global angular*/
angular.module('stackoverflowclone')
.controller('questionListCtrl', function($scope, dataService) {
    dataService.getQuestionList(function(res) {
        $scope.questions = res.data.questions;
    });
});
