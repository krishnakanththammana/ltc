app.controller('doctorCtrl', function($rootScope, $scope, $state, $mdSidenav, $timeout, $mdDialog, $log, MethodFactory) {
    console.log("hi from doctor ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.doctors = $scope.methodFactory.doctors;
    $scope.docSelected = function(index){
      $rootScope.isDoctorSelected = true;
      console.log(index);
      $rootScope.selectedDocIndex = index;
      $mdDialog.hide();
    };
});
