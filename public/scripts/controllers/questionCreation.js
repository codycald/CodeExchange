/*global angular*/
angular.module('stackoverflowclone')
.controller('questionCreationCtrl', function($scope, dataService, $routeParams) {
    
    $scope.createQuestion = function() {
        console.log($scope.userData.username);
        var question = {title: $scope.inputText,
                        text: $scope.textArea,
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
