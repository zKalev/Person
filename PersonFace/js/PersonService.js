personApp.factory('PersonService', ['$q', '$http', '$resource', 'baseUrl', function ($q, $http, $resource, baseUrl) {

    //var personUrl = baseUrl;
    var personResource = $resource(baseUrl, null, {
        getAll: {method: 'GET', isArray: false},
        create: {method: 'POST'}
    });

    return {

        getAll: function () {
            var deferred = $q.defer();
            $http.get(baseUrl).
                success(function (data) {

                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        ,
        get: function () {
            return personResource.getAll().$promise;
        },

        getPersonById: function (id) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/' + id)
                .success(
                function (data) {
                    deferred.resolve(data);
                }
            )
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        createPerson: function (person) {
            // return personResource.create({}, person).$promise;
            var deferred = $q.defer();
            $http.post(baseUrl , person)
                .success(
                function (data) {
                    deferred.resolve(data);
                }
            )
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;

        },
        editPerson: function (person) {
            var deferred = $q.defer();
            $http.put(baseUrl + '/' + person.personId, person)
                .success(
                function (data) {
                    deferred.resolve(data);
                }
            )
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        deletePerson: function (personId) {
            var deferred = $q.defer();
            $http.delete(baseUrl + '/' + personId)
                .success(
                function (data) {
                    deferred.resolve(data);
                }
            )
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        searchByName: function (name) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/search/findByFullNameContains?fullName=' + name)
                .success(
                function (data) {
                    deferred.resolve(data);
                }
            )
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }

}]);
