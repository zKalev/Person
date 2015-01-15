'use strict'
personApp.controller('PersonCtrl', ['$scope', '$location', '$routeParams', 'PersonService', 'NotificationService',
    function ($scope, $location, $routeParams, PersonService, NotificationService) {

        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.namePattern = /^[a-zA-Zа-яА-Я ]*$/

        $scope.getAll = function () {
            PersonService.get().then(
                function (data) {
                    console.log(data);
                    $scope.people = data._embedded.people;
                    console.log(data._embedded.people);
                },
                function (error) {

                });
        }

        $scope.searchByName = function (name) {
            PersonService.searchByName(name).then(
                function (data) {
                    if (data !== undefined && data._embedded !== undefined) {
                        $scope.people = data._embedded.people;
                        console.log(data._embedded.people);
                    }
                }, function (error) {

                });
        }

        $scope.searchName;

        $scope.$watch('searchName', function (newValue, oldValue) {
            if (newValue === oldValue) {

                $scope.getAll();
            }
            else {
                $scope.searchByName(newValue);
            }
        });

        $scope.$location = $location;

        $scope.navigateToEdit = function (person) {
            var personId = getPersonId(person);
            $location.path('/person/edit/' + personId);
        }

        $scope.navigateToDelete = function (person) {
            var personId = getPersonId(person);
            $location.path('/person/delete/' + personId);
        }

        $scope.createNewPerson = function (person) {
            PersonService.createPerson(person).then(
                function (data) {
                    NotificationService.success('Person with name ' + person.fullName + ' edited created');
                    $location.path('/');
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    var errors = [];
                    if (errors = getErrorMessages(error)) {
                        errors.forEach(function (value) {
                            NotificationService.error(value.message);
                        });
                    }
                });
        }

        $scope.deletePerson = function (person) {
            var personId = getPersonId(person);
            PersonService.deletePerson(personId).then(
                function (data) {
                    NotificationService.success('Person with name' + person.fullName + '  deleted successfully');
                    $location.path('/');
                    console.log(data);
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.editPerson = function (person) {
            var personId = getPersonId(person);
            person.personId = personId;
            PersonService.editPerson(person).then(
                function (data) {
                    NotificationService.success('Person with name ' + person.fullName + ' edited successfully');
                    $location.path('/');
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    NotificationService.error("Person is not edited! Please insert name(ex: Zhivko Kalev), pin (ex:01234563456), email(ex:zhivko_kalev@abv.bg)");

                });
        }

        getPersonById();
        function getPersonById() {
            if ($routeParams.id !== undefined) {
                PersonService.getPersonById($routeParams.id).then(
                    function (data) {
                        console.log(data);
                        $scope.currentPerson = data;

                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        function getPersonId(person) {
            var personLink = person._links.self.href,
                id = personLink.substr(personLink.lastIndexOf('/') + 1, personLink.length);
            return id;
        }

        function getErrorMessages(error) {
            if (error !== undefined && error.errors !== undefined) {

                if (error.errors !== undefined) {
                    return error.errors;
                }
            }
        }

    }]);