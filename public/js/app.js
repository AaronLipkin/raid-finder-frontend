const app = angular.module('raidfinder', ['ngRoute']).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/embed/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'https://myapp.example.com/clickThru**'
  ]);
});

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

    $routeProvider.when('/profile', {
        templateUrl: 'profile.html',
        controller: 'profileController',
        controllerAs: 'ctrl'
    })

    $routeProvider.when('/groups/:id', {
        templateUrl: 'group.html',
        controller: 'groupController',
        controllerAs: 'ctrl'
    })

    $routeProvider.when('/', {
        templateUrl: 'home.html'
    })
}])

app.controller('mainController', ['$http','$routeParams', function ($http, $routeParams) {


	this.token = JSON.parse(localStorage.getItem('token'))
	console.log(this.token)
	this.user = {}
	this.characters = [0]
	this.realms = ["Aegwynn", "Aerie Peak", "Agamaggan", "Aggramar", "Akama", "Alexstrasza", "Alleria", "Altar of Storms", "Alterac Mountains", "Aman'Thul", "Andorhal", "Anetheron", "Antonidas", "Anub'arak", "Anvilmar", "Arathor", "Archimonde", "Area 52", "Argent Dawn", "Arthas", "Arygos", "Auchindoun", "Azgalor", "Azjol-Nerub", "Azralon", "Azshara", "Azuremyst", "Baelgun", "Balnazzar", "Barthilas", "Black Dragonflight", "Blackhand", "Blackrock", "Blackwater Raiders", "Blackwing Lair", "Blade's Edge", "Bladefist", "Bleeding Hollow", "Blood Furnace", "Bloodhoof", "Bloodscalp", "Bonechewer", "Borean Tundra", "Boulderfist", "Bronzebeard", "Burning Blade", "Burning Legion", "Caelestrasz", "Cairne", "Cenarion Circle", "Cenarius", "Cho'gall", "Chromaggus", "Coilfang", "Crushridge", "Daggerspine", "Dalaran", "Dalvengyr", "Dark Iron", "Darkspear", "Darrowmere", "Dath'Remar", "Dawnbringer", "Deathwing", "Demon Soul", "Dentarg", "Destromath", "Dethecus", "Detheroc", "Doomhammer", "Draenor", "Dragonblight", "Dragonmaw", "Drak'Tharon", "Drak'thul", "Draka", "Drakkari", "Dreadmaul", "Drenden", "Dunemaul", "Durotan", "Duskwood", "Earthen Ring", "Echo Isles", "Eitrigg", "Eldre'Thalas", "Elune", "Emerald Dream", "Eonar", "Eredar", "Executus", "Exodar", "Farstriders", "Feathermoon", "Fenris", "Firetree", "Fizzcrank", "Frostmane", "Frostmourne", "Frostwolf", "Galakrond", "Gallywix", "Garithos", "Garona", "Garrosh", "Ghostlands", "Gilneas", "Gnomeregan", "Goldrinn", "Gorefiend", "Gorgonnash", "Greymane", "Grizzly Hills", "Gul'dan", "Gundrak", "Gurubashi", "Hakkar", "Haomarush", "Hellscream", "Hydraxis", "Hyjal", "Icecrown", "Illidan", "Jaedenar", "Jubei'Thos", "Kael'thas", "Kalecgos", "Kargath", "Kel'Thuzad", "Khadgar", "Khaz Modan", "Khaz'goroth", "Kil'jaeden", "Kilrogg", "Kirin Tor", "Korgath", "Korialstrasz", "Kul Tiras", "Laughing Skull", "Lethon", "Lightbringer", "Lightning's Blade", "Lightninghoof", "Llane", "Lothar", "Madoran", "Maelstrom", "Magtheridon", "Maiev", "Mal'Ganis", "Malfurion", "Malorne", "Malygos", "Mannoroth", "Medivh", "Misha", "Mok'Nathal", "Moon Guard", "Moonrunner", "Mug'thol", "Muradin", "Nagrand", "Nathrezim", "Nazgrel", "Nazjatar", "Nemesis", "Ner'zhul", "Nesingwary", "Nordrassil", "Norgannon", "Onyxia", "Perenolde", "Proudmoore", "Quel'Thalas", "Quel'dorei", "Ragnaros", "Ravencrest", "Ravenholdt", "Rexxar", "Rivendare", "Runetotem", "Sargeras", "Saurfang", "Scarlet Crusade", "Scilla", "Sen'jin", "Sentinels", "Shadow Council", "Shadowmoon", "Shadowsong", "Shandris", "Shattered Halls", "Shattered Hand", "Shu'halo", "Silver Hand", "Silvermoon", "Sisters of Elune", "Skullcrusher", "Skywall", "Smolderthorn", "Spinebreaker", "Spirestone", "Staghelm", "Steamwheedle Cartel", "Stonemaul", "Stormrage", "Stormreaver", "Stormscale", "Suramar", "Tanaris", "Terenas", "Terokkar", "Thaurissan", "The Forgotten Coast", "The Scryers", "The Underbog", "The Venture Co", "Thorium Brotherhood", "Thrall", "Thunderhorn", "Thunderlord", "Tichondrius", "Tol Barad", "Tortheldrin", "Trollbane", "Turalyon", "Twisting Nether", "Uldaman", "Uldum", "Undermine", "Ursin", "Uther", "Vashj", "Vek'nilash", "Velen", "Warsong", "Whisperwind", "Wildhammer", "Windrunner", "Winterhoof", "Wyrmrest Accord", "Ysera", "Ysondre", "Zangarmarsh", "Zul'jin", "Zuluhed"]

	$http({
	      method: 'GET',
	      url: 'http://localhost:3000/klasses',
	      headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
	    }).then((response) => {
	    	this.klasses = response.data
	      console.log(response);
	    });

	this.getCurrentUser = () => {
		$http({
	      method: 'GET',
	      url: 'http://localhost:3000/users/currentuser',
	      headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
	    }).then((response) => {
	    	this.user = JSON.parse(response.data.user)
	    	this.characters = response.data.characters
	      console.log(response);
	    });
	}


	if(this.token) {
		this.getCurrentUser()
	}

	this.hasAccount = true;
	this.login = (userPass) => {
		$http({
	      method: 'POST',
	      url: 'http://localhost:3000/users/login',
	      data: { user: { username: userPass.username, password: userPass.password }},
	    }).then((response) => {
	    	if(response.data.status === 200) {
		      console.log(response);
		      this.user = response.data.user;
		      localStorage.setItem('token', JSON.stringify(response.data.token));
	      location.reload();
	  }
	  else {
	  	$('.login-oops').css('border-color','red')
	  }
	    });
	}

	this.register = (userPass) => {
		$http({
	      method: 'POST',
	      url: 'http://localhost:3000/users',
	      data: { user: { username: userPass.username, password: userPass.password }}
	    }).then((response) => {
	      console.log(response);
	      this.login(userPass);
	    }, function(){
        console.log('error')
    });
	}

	this.logout = () => {
		localStorage.clear('token');
		location.reload();
	}
}]);


app.controller('groupsController', ['$http','$location','$routeParams', function ($http, $location ,$routeParams) {
	
	

	$http({
        method:'GET',
        url: 'http://localhost:3000/groups',
    }).then((response) => {
        this.groups = response.data;
        console.log(response)
    }, function(){
        console.log('error');
    });

    this.parseChar = () => {
		this.newGroup.raid_leader_object = JSON.parse(this.newGroup.raid_leader)
	}

	this.parseRaid = () => {
		this.newGroup.raid_object = JSON.parse(this.newGroup.raid)
		console.log(JSON.parse(this.newGroup.raid))
	}

	this.getRaids = () => {
		$http({
	        method:'GET',
	        url: 'http://localhost:3000/raids'
	    }).then((response) => {
	        this.raids = response.data
	        console.log(response)
	    }, function(){
	        console.log('error');
	    });
	}
	this.getRaids()

	this.newGroup = {}
	this.createGroup = () => {
		console.log(this.newGroup)
		this.final_group = {
			group_name: this.newGroup.name, 
			raid_leader_id: this.newGroup.raid_leader_object.id, 
			raid_id: this.newGroup.raid_object.id, 
			difficulty: this.newGroup.difficulty, 
			faction: this.newGroup.raid_leader_object.faction, 
			go_time: this.newGroup.go_time,
			spec_id: this.newGroup.spec_id}
		console.log(this.final_group)

		$http({
	        method:'POST',
	        url: 'http://localhost:3000/groups',
	        data: this.final_group
	    }).then((response) => {
		    $http({
		        method:'POST',
		        url: 'http://localhost:3000/ledgers',
		        data: {
		        	character_id: this.final_group.raid_leader_id,
		        	group_id: response.data.id,
		        	spec_id: Number(this.final_group.spec_id)}
		    }).then((response2) => {
		    	$('#newGroupModal').modal('hide')
	        this.newGroup = {}
	        $location.path('/groups/' + response.data.id)
		    }, function(){
		        console.log('error');
		    });
	        console.log(response)
	        

	    }, function(){
	        console.log('error');
	    });
	}

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
	        this.group = JSON.parse(response.data.group);
	        this.members = response.data.members
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
	        this.applicant = {}
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

    this.inGroup = (chars)=> {
    	console.log(chars,this.members)
    	if (this.members) {
    		return !(chars.some(v => this.members.includes(v)))
    	}
    }

    this.getRequests()



}]);

app.controller('raidsController', ['$http','$routeParams', function ($http, $routeParams) {


	this.raid_id = 0;
	this.getRaids = () => {
		$http({
	        method:'GET',
	        url: 'http://localhost:3000/raids'
	    }).then((response) => {
	        this.raids = response.data
	        console.log(response)
	    }, function(){
	        console.log('error');
	    });
	}
	this.getRaids()

	this.selectedRaid = (id) => {
		this.raid = this.raids[id-1]
		console.log(this.raid, id)
	}

}]);

app.controller('profileController', ['$http','$routeParams', function ($http, $routeParams) {

	this.update = 0
	this.newChar = {}
	this.addChar = (user_id) => {
		this.newChar.user_id = user_id;
		this.newChar.armory = "https://worldofwarcraft.com/en-us/character/" + this.newChar.server + "/" + this.newChar.name
		console.log(this.newChar)
		$http({
	        method:'POST',
	        url: 'http://localhost:3000/characters',
	        data: this.newChar
	    }).then((response) => {
	        console.log(response)
	        this.newChar = {};
	        $('#newCharModal').modal('hide')
	        location.reload()
	    }, function(){
	        console.log('error');
	    });
	}

}]);