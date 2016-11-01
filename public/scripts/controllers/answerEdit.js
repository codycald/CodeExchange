/*global angular*/
angular.module('stackoverflowclone')
.controller('answerEditCtrl', function($scope, $sanitize, dataService, $routeParams, $location) {
    
    dataService.getQuestionById($routeParams.id, function(res) {
        var question = res.data.question;
        $scope.answer = question.answers.find(function(ans) {
            return ans._id == $routeParams.ans_id;
        });
    });
    
    $scope.editAnswer = function() {
        var text = $sanitize($scope.answer.text);
        dataService.editAnswer($routeParams.id, $scope.answer._id, {text: text}).then(function() {
            $location.path('/questions/' + $routeParams.id);
        });
    }
    
});
