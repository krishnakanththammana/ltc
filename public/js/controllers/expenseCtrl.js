app.controller('expenseCtrl', function($scope, $state, $mdSidenav, $timeout, $log, $mdDialog) {
    console.log("hi from expense ctrl");
    $scope.showDetails = function (ev) {
      $mdDialog.show({
          controller: 'expenseDialogCtrl',
          templateUrl: 'pages/expenseDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
      })
      .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
          $scope.status = 'You cancelled the dialog.';
      });
    }

    $scope.openPayDialog = function(ev) {
      $mdDialog.show({
          controller: 'paymentDialogCtrl',
          templateUrl: 'pages/payment.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
      })
      .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
          $scope.status = 'You cancelled the dialog.';
      });
    }
});
