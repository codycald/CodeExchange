/*global angular*/
angular.module('stackoverflowclone.service')
.service('sessionService', function($rootScope) {
    
    $rootScope.userData = null;
    
    this.createSession = function(userData) {
        $rootScope.userData = userData;
    }
    
    this.clearSession = function() {
        $rootScope.userData = null;
    }
    
    this.getUser = function() {
        return $rootScope.userData;
    }
});