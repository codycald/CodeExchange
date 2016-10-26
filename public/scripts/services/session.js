/*global angular*/
angular.module('stackoverflowclone')
.service('sessionService', function() {
    
    this.userData = null;
    
    this.createSession = function(data) {
        this.userData = data;
    }
    
    this.clearSession = function() {
        this.userData = null;
        
    }
    
    this.getUser = function() {
        return this.userData;
    }
});