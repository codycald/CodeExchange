/*global angular*/
angular.module('stackoverflowclone')
.controller('questionEditCtrl', function($scope, $sanitize, dataService, $routeParams, $location) {
    
    dataService.getQuestionById($routeParams.id, function(res) {
        $scope.question = res.data.question;
    });
    
    $scope.editQuestion = function() {
        var title = $sanitize($scope.question.title);
        var text = $sanitize($scope.question.text);
        dataService.editQuestion($routeParams.id, {title: title, text: text}).then(function() {
            $location.path('/questions/' + $routeParams.id);
        });
    }
    
});
