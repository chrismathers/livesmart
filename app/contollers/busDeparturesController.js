// controller calling the busdaparturesservice factory
angular
    .module('busStopApp')
    .controller('BusDeparturesController', BusDeparturesController);

BusDeparturesController.$inject = ['departuresservice'];

function BusDeparturesController(departuresservice) {
    var vm = this;
    vm.busDepartures = [];
    vm.busDeparturesList = [];

    activate();

    function activate() {
        return getBusDepartures().then(function() {
            return busDeparturesList = vm.busDeparturesList;
        });
    }

    function getBusDepartures() {
        return departuresservice.getBusDepartures()
            .then(function(data) {
                vm.busDepartures = data;
                vm.busDeparturesList = vm.busDepartures.data.departures;
                return vm.busDeparturesList;
            });
    }
}