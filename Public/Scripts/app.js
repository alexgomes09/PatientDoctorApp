var app = angular.module("DoctorPatientApp", ['ngRoute', 'angularTreeview']);

app.config(['$routeProvider',
    function ($routeProvider) {
		$routeProvider.
		when('/home', {
			templateUrl: 'Views/main.html',
			controller: 'MainController'
		}).
		when('/doctorRegister', {
			templateUrl: 'Views/doctorRegister.html',
			controller: 'DoctorRegisterController'
		}).
		when('/doctorLogin', {
			templateUrl: 'Views/doctorLogin.html',
			controller: 'DoctorLogInController'
		}).
		when('/patient', {
			templateUrl: 'Views/patient.html',
			controller: 'PatientController'
		}).
		otherwise({
			redirectTo: '/home'
		});
    }]);


app.controller("DoctorRegisterController", function ($scope, $location, DoctorPatientService) {

	$scope.submitDoctor = function (doctor) {
		DoctorPatientService.putDoctor(doctor);
		$location.path('/home');
	}
});

app.controller("DoctorLogInController", function ($scope, $location, DoctorPatientService) {

	$scope.loginDoctor = function (doctor) {
		DoctorPatientService.getDoctor(doctor).success(function (data) {
			if (doctor.firstName == data.firstName && doctor.lastName == data.lastName) {
				DoctorPatientService.setCurrentDoctor(data);
				$location.path('/home');
			} else {
				$location.path('/doctorRegister');
			}
		});
	}
});


app.controller("PatientController", function ($scope, $location, DoctorPatientService) {

	$scope.patients = [
		{
			firstName: 'Alex',
			lastName: 'Gomes'
		},
		{
			firstName: 'Chadni',
			lastName: 'Gomes'
		},
   ];

	$scope.submitPatient = function (patient) {
		var name = patient.familyDoctor.firstName + ' ' + patient.familyDoctor.lastName;
		DoctorPatientService.putPatient(patient);
	}
});


app.controller("MainController", function ($scope, DoctorPatientService) {

	if (Object.keys(DoctorPatientService.getCurrentDoctor()).length > 0) {
		$scope.currentDoctor = DoctorPatientService.getCurrentDoctor().firstName + " " + DoctorPatientService.getCurrentDoctor().lastName;
	}

	DoctorPatientService.getPatient().success(function (patient) {
		//console.log(patient);

//		angular.forEach(patient, function (value, key) {
				//			console.log(value)
				//			console.log(key)
				//		})

		$scope.parentBranch = patient;

		$scope.parentNode = patient;

	})


	///////////

	$scope.delete = function (data) {
		data.nodes = [];
	};

	$scope.add = function (data) {
		var post = data.nodes.length + 1;
		var newName = data.name + '-' + post;
		data.nodes.push({
			name: newName,
			nodes: []
		});
	};

	$scope.tree = [{
		name: "Node",
		nodes: []
	}];

	///////////



});

app.service("DoctorPatientService", ['$http', function ($http) {

	var currentDoctor = {};

	this.getDoctor = function (data) {
		return $http.get('/getDoctor', {
			params: {
				firstName: data.firstName,
				lastName: data.lastName
			}
		});
	};

	this.putDoctor = function (data) {
		return $http.post('/submitDoctor', data);
	};


	this.getPatient = function (data) {
		return $http({
			method: "GET",
			url: '/getPatient',
			data: data,
			cache: true
		})
	};

	this.putPatient = function (data) {
		return $http.post('/submitPatient', data);
	};

	this.setCurrentDoctor = function (value) {
		currentDoctor.firstName = value.firstName;
		currentDoctor.lastName = value.lastName;
	}

	this.getCurrentDoctor = function () {
		return currentDoctor;
	}
}]);