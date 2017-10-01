app.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.firstName= "Mullefar er kun mullemors";
    $scope.lastName= "for";

    var lol = 0;


    lol = lol + 7;


    while (lol < 20) {


        console.log("Jeg elsker mullemor23 " + lol);

        lol = lol + 3;
    }

    $http.get('/users3')
        .then(function(response) {
            console.log(response.data);
        });



    $scope.lol = lol;



}]);