/*global angular*/
angular.module('stackoverflowclone.service')
.service('authService', function($http, $q, sessionService) {
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
    
    this.logout = function() {
        return $http.get('/api/logout')
        .then(function(res) {
            sessionService.clearSession();
            return res.data;
        });
    }
    
    this.isLoggedIn = function() {
        return !!sessionService.getUser();
    }
    
    this.retrieveLoginStatus = function() {
        var defer = $q.defer();
        
        $http.get('/api/status')
        .then(function(res) {
            if (res.data.authenticated) {
                sessionService.createSession(res.data);
            } else {
                sessionService.clearSession();
            }
            defer.resolve(res.data);
        })
        .catch(function(err) {
            defer.reject(err);
        });
        
        return defer.promise;
    }
    
});