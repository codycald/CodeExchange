/*global angular*/
angular.module('stackoverflowclone.service')
.service('alertService', function($rootScope) {
    
    $rootScope.alerts = [];
    
    this.alert = function(alert_type, message) {
        $rootScope.alerts.push({type: alert_type, message: message, close: close});
    }
    
    this.close = function(alert) {
        var index = $rootScope.alerts.indexOf(alert);
        if (index != -1)
            $rootScope.alerts.splice(index, 1);
    }
    
});