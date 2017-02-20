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
            });

        // $http({
        //     method: 'POST',
        //     url:'/signup',
        //     data: $scope.usernameWish,
        //     // headers: {
        //     //     'Content-Type': 'application/json'
        //     // }
        // })

    };


}]);