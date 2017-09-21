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

app.controller('mainController', ['$http','$routeParams', function ($http, $routeParams) {
	
	this.token = JSON.parse(localStorage.getItem('token'))
	console.log(this.token)
	this.user = {}

	if(this.token) {
		$http({
	      method: 'GET',
	      url: 'http://localhost:3000/users/currentuser',
	      headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
	    }).then((response) => {
	    	this.user = response.data
	      console.log(response);
	    });
	}

	this.login = (userPass) => {
		$http({
	      method: 'POST',
	      url: 'http://localhost:3000/users/login',
	      data: { user: { username: userPass.username, password: userPass.password }},
	    }).then((response) => {
	      console.log(response);
	      this.user = response.data.user;
	      localStorage.setItem('token', JSON.stringify(response.data.token));
	    });
	}

	this.logout = () => {
		localStorage.clear('token');
		location.reload();
	}
}]);


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

app.controller('raidsController', ['$http','$routeParams', function ($http, $routeParams) {}]);