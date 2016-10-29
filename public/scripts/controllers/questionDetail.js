/*global angular*/
angular.module('stackoverflowclone')
.controller('questionDetailCtrl', function($scope, dataService, $routeParams) {
    
    dataService.getQuestionById($routeParams.id, function(res) {
        $scope.question = res.data.question;
    });
    
    $scope.submitComment = function(qaPost) {
        if ($scope.textArea) {
            console.log('ID is: ' + $routeParams.id);
            console.log('QAPOST ID IS : ' + qaPost._id);
            dataService.submitComment($routeParams.id, {id: qaPost._id, text: $scope.textArea, username: $scope.userData.username});
            qaPost.comments.push({text: $scope.textArea, author: {username: $scope.userData.username}});
        }
        $scope.textArea = '';
    }
    
    $scope.submitAnswer = function(question) {
        if ($scope.answerText) {
            dataService.submitAnswer($routeParams.id, {text: $scope.answerText, username: $scope.userData.username});
        }
            question.answers.push({ text: $scope.answerText, 
                                    author: {
                                        username: $scope.userData.username
                                    },
                                    votes: 0,
                                    comments: []
                                 });
        $scope.answerText = '';
    }
    
    $scope.upvote = function(qaPost) {
        dataService.upvote($routeParams.id, {id: qaPost._id}, function(res) {
            qaPost.votes++;
        });
    }
    
    $scope.downvote = function(qaPost) {
        dataService.downvote($routeParams.id, {id: qaPost._id}, function(res) {
            qaPost.votes--;
        });
    }
    
});
