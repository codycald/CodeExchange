/*global angular*/
angular.module('stackoverflowclone.service')
.service('dataService', function($http, $location) {

    var questions = [];
    
    $http.get('/mock/questions.json').success(function(res) {
        res.forEach(function(question) {
            questions.push(question);
        });
    });
    
    this.getQuestionList = function() {
        return questions;
    }
    
    this.getQuestionById = function(id)  {
        var filteredQuestions = questions.filter(function(question) {
            return question._id === id;
        });
        
        return filteredQuestions[0];
    }
    
    this.createQuestion = function(question) {
        question._id = questions[questions.length - 1]._id + 1;
        questions.push(question);
        $location.path('/');
    }
});