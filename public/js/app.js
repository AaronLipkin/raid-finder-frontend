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
        controller: 'groupController',
        controllerAs: 'ctrl'
    })
}])

app.controller('groupsController', ['$http','$routeParams', function ($http, $routeParams) {
	
	

	$http({
        method:'GET',
        url: 'http://localhost:3000/groups',
    }).then((response) => {
        this.groups = response.data;
        console.log(response)
    }, function(){
        console.log('error');
    });
}]);

app.controller('groupController', ['$http','$routeParams', function ($http, $routeParams) {

	this.group_id = $routeParams.id;

	$http({
        method:'GET',
        url: 'http://localhost:3000/groups/' + $routeParams.id,
    }).then((response) => {
        this.group = response.data;
        console.log(response)
    }, function(){
        console.log('error');
    });
}]);