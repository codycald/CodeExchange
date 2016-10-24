/*global angular */
angular.module('stackoverflowclone', ['ui.bootstrap', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/question-list.html',
        controller: 'questionListCtrl'
    })
    
    .when('/question/:id', {
        templateUrl: 'templates/question-detail.html',
        controller: 'questionCtrl'
    })
    
    .otherwise('/');
    
});
