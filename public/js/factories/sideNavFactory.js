app.factory('SideNavFactory', function($http, $state, $timeout, $mdSidenav, $log) {

    var sidenavFactory = {};

    sidenavFactory.debounce = function(func, wait, context) {
      var timer;
      return function debounced() {
        var context =
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    sidenavFactory.buildDelayedToggler = function(navID) {
      return sidenavFactory.debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    sidenavFactory.buildToggler = function(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    return sidenavFactory;
});
