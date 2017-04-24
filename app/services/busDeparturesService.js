// departuresservice factory
angular
    .module('busStopApp')
    .factory('departuresservice', departuresservice);

departuresservice.$inject = ['$http'];

function departuresservice($http) {
    return {
        getBusDepartures: getBusDepartures
    };

    function getBusDepartures() {
        return $http.get('http://transportapi.com/v3/uk/bus/stop/490011448Z/live.json?group=route&api_key=1036a97b3e95b6dd5039557e4760e1f3&app_id=fdffc0fa')
            .then(getBusDepartures)
            .catch(getBusDeparturesFailed);

        function getBusDepartures(response) {
            return response;
        }

        function getBusDeparturesFailed(error) {
            console.log("abject failure of the bus departues service");
            //logger.error('XHR Failed for getBusStops.' + error.data);
        }
    }
}