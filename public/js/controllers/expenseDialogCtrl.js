app.controller('expenseDialogCtrl', function($scope, $state, $mdSidenav, $timeout, $log, $mdDialog) {
    console.log("hi from expense dialog ctrl");
    $scope.selectedMenu = 0;
    var initialID = "account-details";
    var commonClassName = "expense-content-card";
    $scope.initialIndex = 0;
    $scope.navItems = [{
      "name":"Account Details",
      "id":"account-details",
      "icon":"fa fa-file-text-o fa-2x"
    },{
      "name":"EMI Details",
      "id":"emi-details",
      "icon":"fa fa-pie-chart fa-2x"
    },{
      "name":"Charge Details",
      "id":"charge-details",
      "icon":"fa fa-usd fa-2x"
    },{
      "name":"Account Statement",
      "id":"account-statement",
      "icon":"fa fa-bar-chart fa-2x"
    },{
      "name":"Repayment Schedule",
      "id":"repayment-schedule",
      "icon":"fa fa-reply fa-2x"
    }];
    $scope.selectmenu = function(index, item){
      $scope.selectedMenu = index;
      document.getElementsByClassName("expense-nav-item")[0].disabled = true;
      document.getElementById(initialID).className = commonClassName + " animated rollOut";
      setTimeout(function(){
        document.getElementById(initialID).className = commonClassName + " display-none";
        document.getElementById(item).className = commonClassName + " animated rollIn";
        initialID = item;
        document.getElementsByClassName("expense-nav-item")[0].disabled = false;
      }, 300);
    }
    $scope.changeNav = function(direction){
        if (direction == 'next') {
          if ($scope.initialIndex < ($scope.navItems.length - 1)) {
            $scope.initialIndex++;
            $scope.selectmenu($scope.initialIndex, $scope.navItems[$scope.initialIndex].id);
          }
        } else {
          if ($scope.initialIndex > 0) {
            $scope.initialIndex--;
            $scope.selectmenu($scope.initialIndex, $scope.navItems[$scope.initialIndex].id);
          }
        }
    }
});
