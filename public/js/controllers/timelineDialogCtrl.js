app.controller('timelineDialogCtrl', function($rootScope, $scope, $state, $mdSidenav, $mdDialog, $timeout, $log) {

    console.log("hi from prescription dialog ctrl");
  	$scope.events = $rootScope.eventsGlobal;
  	$scope.side = '';

    $scope.showDetails = function(index, ev, event){
      console.log(event);
      swal({
        title: event.title,
        showConfirmButton: false,
        html: event.content
      })
    }
});
