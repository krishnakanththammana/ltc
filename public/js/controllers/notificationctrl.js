app.controller('notificationctrl', function($rootScope, $scope, $state, $mdSidenav, $timeout, $mdDialog, $log, MethodFactory) {
    console.log("hi from notification ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.doctors = $scope.methodFactory.doctors;
    $scope.userDetails = $scope.methodFactory.userData;
    console.log($scope.userDetails);
    $scope.docSelected = function(index){
      $mdDialog.hide();

      console.log(index);
      $rootScope.selectedDocIndex = index;
    };
    $scope.close = function(){
      $mdDialog.hide();
    }
    $scope.addToMenu = function(){
      window.location = "#/main/overview#diet";
      $scope.close();
    }
    $scope.expanded = false;
    $scope.toggleWidth = function(){
      $scope.expanded = !$scope.expanded;
    }
});
