app.controller('dietRecommendedCtrl', function($rootScope, $scope, $state, $mdSidenav, $mdDialog, $timeout, $log) {
    console.log("hi from recommended diet ctrl");
	   $scope.close = function(){
       $mdDialog.hide();
     }
});
