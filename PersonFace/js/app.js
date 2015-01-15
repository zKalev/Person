'use strict'
var personApp = angular.module('personApp', ['ngRoute', 'spring-data-rest']).config(['$routeProvider', 'SpringDataRestAdapterProvider', function ($routeProvider, SpringDataRestAdapterProvider) {
    //SpringDataRestAdapterProvider.config({
    //    'resourcesFunction': function (url, paramDefaults, actions, options) {
    //        // do the call to the backend and return your desired object
    //    }
    //});
    $routeProvider.when('/', {
        templateUrl: './views/partials/home.html',
        controller: 'PersonCtrl'

    }).when('/person/delete/:id', {
        templateUrl: './views/partials/delete.html',
        controller: 'PersonCtrl'
    }).when('/person/edit/:id', {
        templateUrl: './views/partials/edit.html',
        controller: 'PersonCtrl'
    }).when('/person/new', {
        templateUrl: './views/partials/new.html',
        controller: 'PersonCtrl'
    })

        .otherwise({redirectTo: '/'});

}]).run(function () {

}).value('toastr', toastr)
    .constant('baseUrl', 'http://localhost:8080/people');

