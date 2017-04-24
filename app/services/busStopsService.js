// dataservice factory
angular
    .module('busStopApp')
    .factory('busservice', busservice);

busservice.$inject = ['$http'];

function busservice($http) {
    return {
        getBusStops: getBusStops
    };

    function getBusStops() {
        return $http.get('https://transportapi.com/v3/uk/bus/stops/bbox.json?minlon=-0.0938&minlat=51.5207&maxlon=-0.074&max lat=51.528&api_key=6c790cc8b20f0b394dedf8ba0ff8353c&app_id=915f5f01')
            .then(getBusStopsComplete)
            .catch(getBusStopsFailed);

        function getBusStopsComplete(response) {
            return response;
        }

        function getBusStopsFailed(error) {
            console.log("abject failure of the bus stops service");
            //logger.error('XHR Failed for getBusStops.' + error.data);
        }
    }
}