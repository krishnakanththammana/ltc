app.controller('serviceDialogCtrl', function($scope, $rootScope, $state, $mdSidenav, $timeout, $log, $mdDialog) {
    console.log("hi from service Dialog ctrl");
    $scope.selectedService = $rootScope.selectedService;
    $scope.servicesList = $rootScope.servicesList;
    $scope.close = function() {
      $mdDialog.hide();
    }
    $scope.registerService = function() {
      swal(
        'Done!',
        'You have been registerd to this service!',
        'success'
      )
      $scope.close();
    }
});
