/*global angular */
angular.module('stackoverflowclone', ['stackoverflowclone.service', 'ui.bootstrap', 'ngAnimate', 'ngRoute', 'ngSanitize'])
.config(function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'templates/question-list.html',
        controller: 'questionListCtrl'
    })
    
    .when('/question/new', {
        templateUrl: 'templates/question-new.html',
        controller: 'questionCreationCtrl'
    })
    
    .when('/question/:id', {
        templateUrl: 'templates/question-detail.html',
        controller: 'questionDetailCtrl'
    })
    
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    
    .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    })
    
    .when('/logout', {
        controller: 'logoutCtrl'
    })
    
    .otherwise('/');
    
})

.run(function($rootScope, authService) {
    authService.retrieveLoginStatus()
    .then(function(userData) {
        if (userData.authenticated) {
            $rootScope.userData = userData;
        } else {
            $rootScope.userData = null;
        }
    });
});