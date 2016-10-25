/*global angular */
angular.module('stackoverflowclone', ['ui.bootstrap', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/question-list.html',
        controller: 'questionListCtrl'
    })
    
    .when('/question/new', {
        templateUrl: 'templates/question-new.html',
        controller: 'questionCtrl'
    })
    
    .when('/question/:id', {
        templateUrl: 'templates/question-detail.html',
        controller: 'questionCtrl'
    })
    
    .otherwise('/');
    
});
