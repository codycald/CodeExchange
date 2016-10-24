/*global angular*/
angular.module('stackoverflowclone')
.service('dataService', function($http) {

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
});