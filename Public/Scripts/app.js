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

   $scope.submitDoctor = function(doctor){
   		DoctorPatientService.putDoctor(doctor);
	   $location.path('/home');
   }
});

app.controller("DoctorLogInController",function($rootScope,$scope,$location,DoctorPatientService){  
	
	$scope.loginDoctor = function(doctor){
		DoctorPatientService.getDoctor(doctor).success(function(data){
			if(doctor.firstName == data.firstName && doctor.lastName == data.lastName){
				$rootScope.$emit('doctorLoggedIn',data);
				$location.path('/home');
			}else{
				$location.path('/doctorRegister');
			}
		});
	}
});

app.controller("PatientController", function ($scope, $location, DoctorPatientService) {
	
	$scope.patients = [
     { firstName: 'Alex', lastName: 'Gomes' },
     { firstName: 'Chadni', lastName: 'Gomes' },
   ];
	
   $scope.submitPatient = function(patient){
	   var name = patient.familyDoctor.firstName+' '+patient.familyDoctor.lastName;
	   DoctorPatientService.putPatient(patient);
   }
});


app.controller("MainController",function($rootScope,$scope,DoctorPatientService){
  	
	$rootScope.$on('doctorLoggedIn', function(event, args) {
		$scope.doctorName = args.firstName+" "+args.lastName;
	});
	
});


app.service("DoctorPatientService", ['$http', function ($http) {
	
	var doctorLogin='';

	this.getDoctor = function(data){
		return $http.get('/getDoctor',{
			params:{
				firstName : data.firstName,
				lastName: data.lastName
			}
		});
	}
	
	this.putDoctor = function (data) {
        return $http.post('/submitDoctor',data);
    };
	
	this.putPatient = function (data) {
        return $http.post('/submitPatient',data);
    };


}]);