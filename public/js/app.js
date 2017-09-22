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

	$http({
	      method: 'GET',
	      url: 'http://localhost:3000/klasses',
	      headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
	    }).then((response) => {
	    	this.klasses = response.data
	      console.log(response);
	    });

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

	this.applicant= {};
	this.parseChar = (string) => {
		console.log(JSON.parse(string))
		this.applicant.char_object = JSON.parse(string)
	}

	this.parseSpec = (string) => {
		console.log(JSON.parse(string))
		this.applicant.spec_object = JSON.parse(string)
	}

	this.getGroup = () => {
		$http({
	        method:'GET',
	        url: 'http://localhost:3000/groups/' + $routeParams.id,
	    }).then((response) => {
	        this.group = response.data;
	        console.log(response)
	    }, function(){
	        console.log('error');
	    });
	}
	this.getGroup()


    this.apply = () => {
    	final_applicant = {character_id: this.applicant.char_object.id, group_id: Number(this.group_id), spec_id: this.applicant.spec_object.id, role: this.applicant.spec_object.role, note: this.applicant.note};
    	console.log(final_applicant)
    	$http({
	        method:'POST',
	        url: 'http://localhost:3000/requests/',
	        data: final_applicant
	    }).then((response) => {
	        console.log(response)
	        this.getRequests()
	    }, function(){
	        console.log('error');
	    });
    }

    this.getRequests = () => {
    	$http({
	        method:'GET',
	        url: 'http://localhost:3000/requests/' + this.group_id
	    }).then((response) => {
	    	this.requests = response.data
	        console.log("requests",response)
	    }, function(){
	        console.log('error');
	    });
    }

    this.accept = (id) => {
    	$http({
	        method:'GET',
	        url: 'http://localhost:3000/requests/accept/' + id
	    }).then((response) => {
	        console.log(response)
	        this.getGroup()
	        this.getRequests()
	    }, function(){
	        console.log('error');
	    });
    }

    this.reject = (id) => {
    	$http({
	        method:'GET',
	        url: 'http://localhost:3000/requests/reject/' + id
	    }).then((response) => {
	        console.log(response)
	        this.getGroup()
	        this.getRequests()
	    }, function(){
	        console.log('error');
	    });
    }

    this.getRequests()



}]);

app.controller('raidsController', ['$http','$routeParams', function ($http, $routeParams) {



}]);