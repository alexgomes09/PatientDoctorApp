var app = angular.module("DoctorPatientApp", ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'Views/main.html',
            controller: 'MainController'
        }).
        when('/doctorRegister', {
            templateUrl: 'Views/doctorRegister.html',
            controller: 'DoctorController'
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

app.controller("DoctorController", function ($scope, $location, DoctorPatientService) {

   $scope.submitDoctor = function(doctor){
	  console.log(doctor.firstName);
	  console.log(doctor.lastName);
	   DoctorPatientService.putDoctor(doctor);
   }
});

app.controller("PatientController", function ($scope, $location, DoctorPatientService) {
	
	$scope.patients = [
     { firstName: 'Alex', lastName: 'Gomes' },
     { firstName: 'Chadni', lastName: 'Gomes' },
   ];
	
   $scope.submitPatient = function(patient){
	   var name = patient.familyDoctor.firstName+' '+patient.familyDoctor.lastName;
	  console.log(patient);
	
	   DoctorPatientService.putPatient(patient);
   }
   
   
});

app.controller("DoctorLogInController",function($scope){  
	
});

app.controller("MainController",function($scope,DoctorPatientService){
  
	
});


app.service("DoctorPatientService", ['$http', function ($http) {

	this.putDoctor = function (data) {
        return $http.post('/submitDoctor',data);
    };
	
	this.putPatient = function (data) {
        return $http.post('/submitPatient',data);
    };


}]);