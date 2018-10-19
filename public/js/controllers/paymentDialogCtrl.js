app.controller('paymentDialogCtrl', function($scope, $state, $mdSidenav, $timeout, $log, $mdDialog) {
    console.log("hi from payment ctrl");

    $scope.paymentStage = 0;

    $scope.changePaymentMode = function(mode) {
      $scope.paymentStage = mode;
    }
});
