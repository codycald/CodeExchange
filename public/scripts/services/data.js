/*global angular*/
angular.module('stackoverflowclone')
.service('dataService', function($http) {
    this.getQuestionList = function(callback) {
        $http.get('/mock/questions.json').then(callback);
    };
});