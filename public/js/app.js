const app = angular.module('raidfinder', ['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.html5Mode({enabled:true});
    $routeProvider.when('/groups', {
        templateUrl: 'groups.html',
        controller: 'groupsController',
        controllerAs: 'ctrl'
    })

    $routeProvider.when('/raids', {
        templateUrl: 'raids.html',
        controller: 'raidsController',
        controllerAs: 'ctrl'
    })

    $routeProvider.when('/groups/:id', {
        templateUrl: 'group.html',
        controller: 'groupsController',
        controllerAs: 'ctrl'
    })
}])

app.controller('groupsController', ['$http','$routeParams', function ($http, $routeParams) {
	
	this.group_id = $routeParams.id;

	$http({
        method:'GET',
        url: 'http://localhost:3000/groups',
    }).then((response) => {
        this.groups = response;
    }, function(){
        console.log('error');
    });
}]);