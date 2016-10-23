/*global angular*/
angular.module('stackoverflowclone')
.controller('questionListCtrl', ['$scope', 'dataService', function($scope, dataService) {
    $scope.questions = dataService.getQuestionList(function(res) {
        $scope.questions = res.data;
    });
}]);
