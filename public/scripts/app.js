/*global angular */
angular.module('stackoverflowclone', ['stackoverflowclone.service', 'ui.bootstrap', 'ngAnimate', 'ngRoute', 'ngSanitize', 'ngMessages'])
.config(function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'templates/question-list.html',
        controller: 'questionListCtrl'
    })
    
    .when('/question/new', {
        templateUrl: 'templates/question-new.html',
        controller: 'questionCreationCtrl',
        restricted: true
    })
    
    .when('/question/:id', {
        templateUrl: 'templates/question-detail.html',
        controller: 'questionDetailCtrl'
    })
    
    .when('/question/:id/edit', {
        templateUrl: 'templates/question-edit.html',
        controller: 'questionEditCtrl'
    })
    
    .when('/question/:id/answer/:ans_id/edit', {
        templateUrl: 'templates/answer-edit.html',
        controller: 'answerEditCtrl'
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

.run(function($rootScope, $location, authService, alertService) {
    authService.retrieveLoginStatus()
    .then(function(userData) {
        if (userData.authenticated) {
            $rootScope.userData = userData;
        } else {
            $rootScope.userData = null;
        }
    });
    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $rootScope.alerts = [];
        if (next.restricted && !authService.isLoggedIn()) {
            event.preventDefault();
            alertService.alert('danger', 'Please login first');
            $location.path('/login');
        }
    });
    
    $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    }
    
});
