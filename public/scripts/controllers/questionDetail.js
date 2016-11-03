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
            sessionService.updateUser('votedPosts', res.data.votedPosts);
        });
    }
    
    $scope.downvote = function(qaPost) {
        $scope.checkLoginStatus();
        dataService.downvote($routeParams.id, {id: qaPost._id}).then(function(res){
            qaPost.votes = res.data.voteTotal;
            sessionService.updateUser('votedPosts', res.data.votedPosts);
        });
    }
    
    $scope.editQuestion = function(question) {
        if (question.author.username === $scope.userData.username) {
            $location.path('/question/' + question._id + '/edit');
        }
    }
    
    $scope.deleteQuestion = function(question) {
        if (question.author.username === $scope.userData.username) {
            dataService.deleteQuestion($routeParams.id);
            $location.path('/');
        }
    }
    
    $scope.editAnswer = function(answer) {
        if (answer.author.username === $scope.userData.username) {
            $location.path('/question/' + $routeParams.id + '/answer/' + answer._id + '/edit');
        }
    }
    
    $scope.deleteAnswer = function(answer) {
        if (answer.author.username === $scope.userData.username) {
            dataService.deleteAnswer($routeParams.id, answer);
            $location.path('/');
        }
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
    
    $scope.isupvoted = function(qaPost) {
        if (!qaPost) return false;
        if ($scope.userData && $scope.userData.votedPosts) {
            var foundPost = $scope.userData.votedPosts.find(function(post) {
                return post.id == qaPost._id;
            });
            if (foundPost) {
                return foundPost.isupvoted;
            }
        }
        return false;
    }
    
    $scope.isdownvoted = function(qaPost) {
        if (!qaPost) return false;
        if ($scope.userData && $scope.userData.votedPosts) {
            var foundPost = $scope.userData.votedPosts.find(function(post) {
                return post.id == qaPost._id;
            });
            if (foundPost) {
                return !foundPost.isupvoted;
            }
        }
        return false;
    }
    
    
});
