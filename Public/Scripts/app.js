var app = angular.module("DoctorPatientApp", ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
		$routeProvider.
		when('/home', {
			templateUrl: 'Views/patientList.html',
			controller: 'PatientListController'
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
		when('/patientDetails', {
			templateUrl: 'Views/patientDetails.html',
			controller: 'PatientDetailsController'
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

app.controller("PatientController", function ($scope, $rootScope, $location, DoctorPatientService) {

	DoctorPatientService.getAllDoctor().success(function (data) {
		$scope.familyDoctors = data;
	});

	$scope.submitPatient = function (patient) {

		DoctorPatientService.putPatient(patient).success(function () {
			alert("Patient was created")
			$location.path("/home");
			$rootScope.$emit("name");
		});
	}
});

app.controller("PatientListController", function ($scope, $window, $route, $location, DoctorPatientService) {
	if (Object.keys(DoctorPatientService.getCurrentDoctor()).length > 0) {
		$scope.currentDoctor = DoctorPatientService.getCurrentDoctor().firstName + " " + DoctorPatientService.getCurrentDoctor().lastName;
	}

	$scope.refreshView = function () {
		console.log("view Refreshed")
	}


	DoctorPatientService.getPatient().success(function (patient) {
		$scope.currentPage = 0;
		$scope.pageSize = 10;
		$scope.data = patient;
		$scope.numberOfPages = function () {
			return Math.ceil($scope.data.length / $scope.pageSize);
		}
		for (var i = 0; i < 45; i++) {
			$scope.patientModel = $scope.data;
		}
	});

	$scope.selectedPatient = function (data) {
		DoctorPatientService.setPatientDetails(data);
		$location.path('/patientDetails');
	};

	$scope.deletePatient = function (data) {
		console.log(data);
		DoctorPatientService.deletePatient(data).success(function (data) {});
	}
});


app.controller("PatientDetailsController", function ($scope, DoctorPatientService) {
	$scope.patient = DoctorPatientService.getPatientDetails();

	DoctorPatientService.getAllDoctor().success(function (data) {
		$scope.familyDoctors = data;
		console.log($scope.familyDoctors);
	});

	$scope.editPatient = function (patient) {
		console.log(patient);
		DoctorPatientService.updatePatient(patient).success(function (data) {
			alert(data);
			console.log(data)
		});
	}
})

app.service("DoctorPatientService", ['$http', function ($http) {

	var currentDoctor = {};
	var patientDetails = {};

	this.getAllDoctor = function (data) {
		return $http.get('/getAllDoctor', data);
	}

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

	this.deletePatient = function (data) {
		return $http({
			method: "DELETE",
			url: "/deletePatient",
			params: {
				firstName: data.firstName,
				lastName: data.lastName
			}
		})
	}

	this.putPatient = function (data) {
		return $http.post('/submitPatient', data);
	};

	this.updatePatient = function (data) {
		return $http.post('/updatePatient', JSON.stringify(data));
	}

	this.setCurrentDoctor = function (value) {
		currentDoctor.firstName = value.firstName;
		currentDoctor.lastName = value.lastName;
	}

	this.getCurrentDoctor = function () {
		return currentDoctor;
	}

	this.setPatientDetails = function (value) {
		patientDetails = value;
	}

	this.getPatientDetails = function () {
		return patientDetails;
	}

}]);

app.filter('startFrom', function () {
	return function (input, start) {
		if (!input || !input.length) {
			return;
		}
		start = +start; //parse to int
		return input.slice(start);
	}
});