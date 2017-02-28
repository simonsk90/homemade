app.controller('signupController', ['$scope', '$http', function($scope, $http) {


    $scope.signupUser = function() {
        var name = $scope.usernameWish;

        if (!$scope.passwordWish || !$scope.passwordWish2 && $scope.passwordWish !== $scope.passwordWish2) {
            alert("Your passwords don't match");
            return;
        }

        var newUserRequestObject = {
            username: $scope.usernameWish,
            password: $scope.passwordWish
        };

        $http.post('/signup', newUserRequestObject)
            .then(function(response) {
                console.log(response);
            }, function(err) {
                debugger;
            });
    };

    $scope.authUser = function() {
        var newUserRequestObject = {
            username: $scope.usernameAuth,
            password: $scope.passwordAuth
        };

        $http.post('/login', newUserRequestObject)
            .then(function(response) {
                console.log(response);
            }, function(err) {
                debugger;
            });

    };



}]);