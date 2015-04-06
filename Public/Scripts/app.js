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

//Doctor register controller which handels registering doctor
app.controller("DoctorRegisterController", function ($scope, $location, DoctorPatientService) {

	$scope.submitDoctor = function (doctor) {
		DoctorPatientService.putDoctor(doctor).success(function(data){ // if register doctor is success then do following
			alert("Doctor was registered"); // alert that doctor was registered
			$location.path('/doctorLogin'); // if registered the take to doctor login for doctor to login
		});
	}
});

// doctor login controller which handeles login as a doctor
app.controller("DoctorLogInController", function ($scope, $location, DoctorPatientService) {

	$scope.loginDoctor = function (doctor) {
		DoctorPatientService.getDoctor(doctor).success(function (data) {
			if (doctor.firstName == data.firstName && doctor.lastName == data.lastName) {
				DoctorPatientService.setCurrentDoctor(data);
				$location.path('/home'); // if doctor login succeed then take doctor to home 
			} else {
				if (confirm("We didnt find the doctor. Would you like to register new doctor") == true) {
					$location.path('/doctorRegister'); // if not succeed then take user to doctor register form
				} else {
					$location.path('/home'); // else take doctor to home page
				}
			}
		});
	}
});

// patient Controller which get all the doctor to show in the combo box
app.controller("PatientController", function ($scope, $window, $location, DoctorPatientService) {

	DoctorPatientService.getAllDoctor().success(function (data) { // show doctor in the combo box
		$scope.familyDoctors = data;
	});

	// register patient 
	$scope.submitPatient = function (patient) {
		DoctorPatientService.putPatient(patient).success(function () {
			alert("Patient was created")
			$location.path("/home"); // take user to home page and reload page
			$window.location.reload()
		});
	}
});

// patient lsit controller which is the main controller.
app.controller("PatientListController", function ($scope, $route, $window, $location, DoctorPatientService) {
	if (Object.keys(DoctorPatientService.getCurrentDoctor()).length > 0) {
		$scope.currentDoctor = DoctorPatientService.getCurrentDoctor().firstName + " " + DoctorPatientService.getCurrentDoctor().lastName;
	}

	function getPatient(){
		DoctorPatientService.getPatient().success(function (patient) { // get patient and show then in a list of 10
			$scope.currentPage = 0;
			$scope.pageSize = 10;
			$scope.data = patient;
			$scope.numberOfPages = function () {
				return Math.ceil($scope.data.length / $scope.pageSize);
			}
			for (var i = 0; i < $scope.data.length; i++) {
				$scope.patientModel = $scope.data; // set the patient as patient model
			}
		});
	}
	
	getPatient(); // call get patient method for the lsit to work
	
	//if user select patient then take user to patietn Details form
	$scope.selectedPatient = function (data) {
		DoctorPatientService.setPatientDetails(data);
		$location.path('/patientDetails');
	};

	// delete patient handels the patient to delete
	$scope.deletePatient = function (data) {
		console.log(data);

		DoctorPatientService.deletePatient(data).success(function (data) { // if success then delete the patient 
			alert(data) // alert that patient was deleted and reload the page
			$window.location.reload();
		});
	}

	// search patient from search bar which gets the patient and show in the lsit
	$scope.searchPatient = function(data){
		DoctorPatientService.searchPatient(data).success(function(data){
			console.log(data);
			if(data.length > 0){
				$scope.patientModel = data;
			}else{
				alert("User doesnt exist"); // if search come out null then  show this alert message
				$scope.patientModel = getPatient(); // call the getpatient to populate will all the list
			}
		});
	}
});

// Patient details controller deals with filling up all the inputs with whatever patient  user clicked on
app.controller("PatientDetailsController", function ($scope, $location, $window, DoctorPatientService) {
	$scope.patient = DoctorPatientService.getPatientDetails();

	$scope.editPatient = function (patient) { // allow user the edit the patietent
		console.log(patient);
		DoctorPatientService.updatePatient(patient).success(function (data) { // update the patietn based on new input
			alert(data);
			console.log(data)
			$location.path('/home'); // if edited then take user to home page and reload page
			$window.location.reload();
		});
	}
})

// angular service that handles with all the service
app.service("DoctorPatientService", ['$http', function ($http) {

	var currentDoctor = {};
	var patientDetails = {};

	// getAll doctor service
	this.getAllDoctor = function (data) {
		return $http.get('/getAllDoctor', data);
	}

	//get Doctor based on firstName and lastName
	this.getDoctor = function (data) {
		return $http.get('/getDoctor', {
			params: {
				firstName: data.firstName,
				lastName: data.lastName
			}
		});
	};

	//put the doctor service
	this.putDoctor = function (data) {
		return $http.post('/submitDoctor', data);
	};

	//search Patient service
	this.searchPatient = function(data){
		return $http({
			method:"GET",
			url:"/searchPatient",
			params:{
				data:data
			}
		})
	}

	// get all the patient
	this.getPatient = function (data) {
		return $http({
			method: "GET",
			url: '/getPatient',
			data: data,
			cache: true
		})
	};

	//delete particular patient based on firstname and lastname
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

	// register new patient service
	this.putPatient = function (data) {
		return $http.post('/submitPatient', data);
	};

	// patietn upate service
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

//filter for pagination
app.filter('startFrom', function () {
	return function (input, start) {
		if (!input || !input.length) {
			return;
		}
		start = +start; //parse to int
		return input.slice(start);
	}
});