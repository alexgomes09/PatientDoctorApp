var app = angular.module("DoctorPatientApp", ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'Views/main.html',
            controller: 'MainController'
        }).
        when('/doctor', {
            templateUrl: 'Views/doctor.html',
            controller: 'DoctorController'
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
   
    $scope.selectedPatient = function (patient) {
        $location.path('/PatientDetails');
        Patient.setPatientDetails(patient);
    };
});

app.controller("MainController",function($scope,$location){
    
});


app.service("DoctorPatientService", ['$http', function ($http) {

	this.putDoctor = function (data) {
        return $http.post('/submitDoctor',data);
    };

    this.getPatientDetails = function () {
        return patientDetails;
    };
    this.setPatientDetails = function (value) {
        patientDetails = value;
    };

}]);