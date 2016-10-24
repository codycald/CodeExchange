/*global angular*/
angular.module('stackoverflowclone')
.controller('questionCtrl', function($scope, dataService, $routeParams) {
    $scope.question = dataService.getQuestionById($routeParams.id);
    
    $scope.submitQuestionComment = function(qaPost) {
        if ($scope.textArea)
            qaPost.comments.push({text: $scope.textArea, author: 'Author 1'});
        $scope.textArea = '';
    }
    
    $scope.submitAnswer = function(question) {
        if ($scope.answerText)
            question.answers.push({ text: $scope.answerText, 
                                    author: 'Author 1',
                                    votes: 0,
                                    comments: []
                                 });
        $scope.answerText = '';
    }
    
});
