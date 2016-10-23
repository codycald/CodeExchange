/*global angular*/
angular.module('stackoverflowclone')
.directive('questionList', function() {
    return {
        templateUrl: 'templates/question-list.html',
        replace: true,
        controller: 'questionListCtrl'
    };
});