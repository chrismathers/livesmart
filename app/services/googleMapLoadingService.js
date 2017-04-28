busStopApp.service('lazyLoadApi', function lazyLoadApi($window, $q) {
    function loadScript() {
        console.log('loadScript');
        // use global document since Angular's $document is weak
        const s = document.createElement('script');
        s.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyAY04OqN1R8sBO0WXbrAu_GHGxasr3MiUY&language=en&callback=initMap';
        document.body.appendChild(s);
    }
    const deferred = $q.defer();

    $window.initMap = function () {
        deferred.resolve()
    };

    if ($window.attachEvent) {
        $window.attachEvent('onload', loadScript)
    } else {
        $window.addEventListener('load', loadScript, false)
    }

    return deferred.promise
});