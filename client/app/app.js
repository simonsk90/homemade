var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/test', {
            templateUrl: 'test/TestView.html',
            controller: 'testController'
        })
        .when('/home', {
            templateUrl: 'home/HomeView.html',
            controller: 'homeController'
        })
        .when('/signup', {
            templateUrl: 'login/signup.html',
            controller: 'signupController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);