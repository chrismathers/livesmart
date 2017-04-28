angular
    .module('busStopApp')
    .directive('googleMap', googleMap);

function googleMap(lazyLoadApi, busservice) {
    var directive = {
        restrict: 'CA', // restrict by class name
        scope: {
            mapId: '@id', // map ID
            lat: '@', // latitude
            long: '@', // longitude
            busStopList: '@'
        },
        controller: ['$scope', 'busservice', function($scope, busservice){
            $scope.busStopList = [];
            $scope.getBusStopsList = function getBusStops() {
                return busservice.getBusStops()
                    .then(function (response) {
                        var stops = response.data.stops;
                        var tmp = [];
                        angular.forEach(stops, function (stop) {
                            myObject = {
                                lat: stop.latitude,
                                lng: stop.longitude
                            };
                            tmp.push(myObject);
                        });
                        $scope.busStopList = tmp;
                    });
            };
        }],
        //controller: BusStopController,
        controllerAs: 'vm',
        bindToController: false,
        link: function(scope, element) {
            var location = null;
            var map = null;
            var mapOptions = null;

            if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {
                // Loads google map script, then get bus stop list, then initialize the map
                lazyLoadApi
                    .then(scope.getBusStopsList)
                    .then(initializeMap)
            }

            function initializeMap() {
                location = new google.maps.LatLng(scope.lat, scope.long);

                mapOptions = {
                    zoom: 13,
                    center: {lat: 50.82103, lng: -0.09208}
                };

                map = new google.maps.Map(element[0], mapOptions);

                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var markers = scope.busStopList.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                    });
                });

                var markerCluster = new MarkerClusterer(map, markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            }
        }
    };

    return directive;
};