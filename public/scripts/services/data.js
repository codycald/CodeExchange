/*global angular*/
angular.module('stackoverflowclone.service')
.service('dataService', function($http, $location, sessionService) {

    var questions = [];
    
    $http.get('/mock/questions.json').success(function(res) {
        res.forEach(function(question) {
            questions.push(question);
        });
    });
    
    this.getQuestionList = function(cb) {
        $http.get('/api/questions').then(cb);
    }
    
    this.getQuestionById = function(id, cb)  {
        $http.get('/api/questions/' + id).then(cb);
    }
    
    this.createQuestion = function(question) {
        return $http.post('/api/questions', question).then(function() {
            questions.push(question);
            $location.path('/');
        });
    }
    
    this.submitAnswer = function(question_id, answer, cb) {
        $http.post('/api/questions/' + question_id + '/answer', answer).then(cb);
    }
    
    this.submitComment = function(question_id, comment, cb) {
        return $http.post('/api/questions/' + question_id + '/comment', comment).then(cb);
    }
    
    this.upvote = function(question_id, post) {
        return $http.post('/api/questions/' + question_id  + '/upvote', post)
        .success(function(res) {
            sessionService.updateUser('votedPosts', res.votedPosts);
        });
    }
    
    this.downvote = function(question_id, post) {
        return $http.post('/api/questions/' + question_id  + '/downvote', post)
        .success(function(res) {
            sessionService.updateUser('votedPosts', res.votedPosts);
        });
    }
});