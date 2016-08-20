angular.module('app').controller('loginController', ['$scope', '$http', function($scope, $http){
    
    $scope.user = {
        userName: '',
        password: ''
    };
    
    $scope.registerUser = function () {
    
        var onPost = function(response) {
        }
        
        $http({
            method: 'POST',
            url: 'https://homemade-legolasdk.c9users.io:8080/api/registerUser',
            headers: { 'Content-Type': 'application/json' },
            // data: { test: 'something' }
            data: $scope.user
        }).then(onPost);
        
    }

}]);