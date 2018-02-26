app.controller('homeController', ['$scope', '$http', 'Calculator', function($scope, $http, Calculator) {
    $scope.firstName= "Mullefar er kun mullemors123";
    $scope.lastName= "for bbbsss";

    var lol = 3;


    lol = lol + 9;


    while (lol < 20) {


        console.log("Jeg elsker mullemor2345 " + lol);

        lol = lol + 2456612411111555;
    }

    $http.get('/users4')
        .then(function(response) {
            $scope.users = response.data;
            console.log(response.data);
        });



    $scope.lol = lol;

    $scope.square = Calculator.square(4);
    
}]);