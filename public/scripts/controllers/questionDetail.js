/*global angular*/
angular.module('stackoverflowclone')
.controller('questionDetailCtrl', function($scope, $location, $routeParams, $sanitize, dataService, authService, sessionService) {
    
    dataService.getQuestionById($routeParams.id, function(res) {
        $scope.question = res.data.question;
    });
    
    $scope.submitComment = function(qaPost) {
        if ($scope.textArea) {
            dataService.submitComment($routeParams.id, {id: qaPost._id, text: $scope.textArea, username: $scope.userData.username}, function(res) {
                qaPost.comments.push(res.data.comment);
            });
        }
        $scope.textArea = '';
    }
    
    $scope.submitAnswer = function(question) {
        $scope.checkLoginStatus();
        if ($scope.answerText) {
            var text = $sanitize($scope.answerText);
            dataService.submitAnswer($routeParams.id, {text: text, username: $scope.userData.username}, function(res) {
                question.answers.push(res.data.answer);
            });

        }
        $scope.answerText = '';
    }
    
    $scope.upvote = function(qaPost) {
        $scope.checkLoginStatus();
        dataService.upvote($routeParams.id, {id: qaPost._id}).then(function(res){
            qaPost.votes =  res.data.voteTotal;
        });
    }
    
    $scope.downvote = function(qaPost) {
        $scope.checkLoginStatus();
        dataService.downvote($routeParams.id, {id: qaPost._id}).then(function(res){
            qaPost.votes = res.data.voteTotal;
        });
    }
    
    $scope.checkLoginStatus = function() {
        if (!sessionService.getUser()) {
            $location.path('/login');
        }
    }
    
    $scope.ensureLoggedIn = function(commenting) {
        if (authService.isLoggedIn()) {
            return !commenting;
        } else {
            $location.path('/login');
            return false;
        }
    }
    
});
