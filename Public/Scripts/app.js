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

app.controller("DoctorController", function ($scope, $location, Patient) {

   $scope.submitDoctor = function(doctor){
	  console.log(firstName);
	  console.log(lastName);
   }
   
   
    $scope.selectedPatient = function (patient) {
        $location.path('/PatientDetails');
        Patient.setPatientDetails(patient);
    };
});

app.controller("MainController",function($scope,$location){
    
});


app.service("Patient", ['$http', function ($http) {
    var url = '../Data/Patient.json';
    var patientDetails = '';

    this.getPatient = function () {
        return $http.get(url);
    };
    
    this.putPatient = function (data) {
        return $http.post('/save',data);
    };

    this.getPatientDetails = function () {
        return patientDetails;
    };
    this.setPatientDetails = function (value) {
        patientDetails = value;
    };

}]);