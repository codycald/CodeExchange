/*global angular*/
angular.module('stackoverflowclone')
.service('authService', function($http, sessionService) {
    this.login = function(user) {
        return $http.post('/api/login', user)
        .then(function(res) {
            sessionService.createSession(res.data);
            console.log(res.data);
            return res.data;
        });
    }
    
    this.register = function(user) {
        return $http.post('/api/register', user)
        .then(function(res) {
            sessionService.createSession(res.data);
            console.log(res.data);
            return res.data;
        });
    }
    
    this.isLoggedIn = function() {
        return !!sessionService.getUser();
    }
    
});