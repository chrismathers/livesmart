// controller calling the dataservice factory
angular
    .module('busStopApp')
    .controller('BusStopController', BusStopController);

BusStopController.$inject = ['busservice'];

function BusStopController(busservice) {
    var vm = this;
    vm.busStops = [];
    vm.busStopList = [];

    activate();

    function activate() {
        return getBusStops().then(function() {
            return busStopList = vm.busStopList;
        });
    }

    function getBusStops() {
        return busservice.getBusStops()
            .then(function(data) {
                vm.busStops = data;
                vm.busStopList = vm.busStops.data.stops;
                return vm.busStopList;
            });
    }
}