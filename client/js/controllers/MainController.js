angular.module('app').controller('mainController', ['$scope', '$http', function($scope, $http){
    
    var onTest = function (response) {
        console.log(response.data);
        // alert(response.data);
        
    }
    $scope.abc = location;
    // var ip = location.host;
    // alert(ip);
    $scope.test = "fasdf";

    $http.get('https://homemade-legolasdk.c9users.io:8080/api/GetTest').then(onTest);

}]);