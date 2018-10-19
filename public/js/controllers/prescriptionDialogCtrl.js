app.controller('prescriptionDialogCtrl', function($rootScope, $scope, $state, $mdSidenav, $timeout, $log, $mdDialog, MethodFactory) {
    console.log("hi from prescription dialog ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.userDetails = $scope.methodFactory.userData;
    $scope.expanded = false;
    $scope.toggleWidth = function() {
        $scope.expanded = !$scope.expanded;
    };
    $scope.close = function() {
        $mdDialog.hide();
    };
    $scope.addToMenu = function() {
        window.location = "#/main/overview#prescription";
        $scope.close();
    }
    $scope.showTimer = function() {

    }
    $scope.reminders  = [];
    $scope.showDiv = function(index) {
        var reminderTime = document.getElementsByClassName('medImage')[index].value;
        console.log(reminderTime);
        $scope.reminders.push(reminderTime);
    }
    $scope.removeReminder = function(index) {
      $scope.reminders.splice(index, 1);
    }
    $scope.refillRequest = function() {
        swal({
            title: 'Done!',
            text: 'Refill request has been sent',
            type: 'success',
            timer: 2000
        }).then(function() {

        });
    };
    console.log($scope.userDetails);
    $scope.rowtoOpen = null;
    $scope.openRow = function(index) {
      if ($scope.rowtoOpen != index) {
        $scope.rowtoOpen = index;
      } else {
        $scope.rowtoOpen = null;
      }
      console.log($scope.rowtoOpen);
    }
     console.log($scope.timeRemainder);
    /*S$scope.example = function(index, item) {
        swal({
            title: item.name,
            imageUrl: item.presimage,
            html: '<h5>Remainder : <input type="text" id="dates" name="set time" >' +
                //'<div ng-repeat="timer in setTimer">'
                //'<span>{{timer}}</span>'+
                '<button>X</button>' +
                '</div>' +
                '<i class="fa fa-plus"></i>' +
                '</h5>' +
                '<script>$("#dates").dateDropper();</script>',
            imageWidth: 400,
            imageHeight: 200,
            animation: false
                //showConfirmButton: false,
                //timer: 2000
        }).then(function() {

        });
    };*/
  $scope.timal = function(index) {
        console.log("this function timal is been called");
        var reminderTime = document.getElementsByClassName('medImage')[index].value;
        $rootScope.setTimer(reminderTime, index);
    }


});
