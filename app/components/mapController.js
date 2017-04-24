// controller creating the map
angular
    .module('busStopApp')
    .controller('MapController', MapController);

function MapController(NgMap) {
    var vm = this;
    vm.theMap = null;

    activate();

    function activate() {
        return getMap().then(function() {
            return getMap = vm.getMap;
        });
    }

    function getMap() {
        return NgMap.getMap()
            .then(function(map) {
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
                return vm.theMap;
            });
    }
}