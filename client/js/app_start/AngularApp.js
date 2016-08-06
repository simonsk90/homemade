var app = angular.module('app', []);

angular.module('app.controllers', []);


app.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});



// myApp.controller('GreetingController', ['$scope', '$http', function ($scope, $http) {
//     $scope.greeting = 'Hola!';


//     // var onTest = function (response) {
//     //     alert(response.data);
//     // }

//     // $http.get('http://localhost:3000/api/GetTest').then(onTest);

// }]);