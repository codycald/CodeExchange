/*global angular*/
angular.module('stackoverflowclone')
.controller('questionCreationCtrl', function($scope, $sanitize, dataService, $routeParams) {
    
    $scope.createQuestion = function() {
        var title = $sanitize($scope.inputText);
        var text = $sanitize($scope.textArea);
        var question = {title: title,
                        text: text,
                        username: $scope.userData.username,
                        votes: 0,
                        views: 0,
                        tags: '',
                        comments: [],
                        answers: []
                       }
        dataService.createQuestion(question);
    }
    
});
