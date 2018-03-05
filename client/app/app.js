var app = angular.module('app', ['ngRoute', 'CalculatorService']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'client/app/home/HomeView.html',
            controller: 'homeController'
        })

        .when('/test', {
            templateUrl: 'client/app/test/TestView.html',
            controller: 'testController'
        })

        .when('/signup', {
            templateUrl: 'client/app/login/signup.html',
            controller: 'signupController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);