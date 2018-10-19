app.controller('devCtrl', function($scope, $state, $mdSidenav, $timeout, $log, $http) {
    console.log("hi dev !");


    $scope.userData = null;
    $scope.dataDisplay = "Click on Modify Users button to generate random values and see the database";
    $scope.getAll = function() {
      var req2 = {
          method: 'GET',
          url: '/testingg',
          headers: {
              'Content-Type': 'text/plain'
          }
      }
      var res2 = $http(req2);
      res2.success(function(data, status, headers, config) {
          for (var i = 0; i < data.length; i++) {
            data[i].record = JSON.parse(data[i].record);
          }
          console.log(data);
          $scope.userData = data;
      });
      res2.error(function(data, status, headers, config) {
          alert("failure message: " + JSON.stringify({
              data: data
          }));
      });
    }
    $scope.getAll();

    $scope.modifyUsers = function() {
      for (var i = 0; i < $scope.userData.length; i++) {
        if ($scope.userData[i].record.recovery) {
          $scope.userData[i].record.recovery = {
            "Diabetic_Fasting" : [],
            "Diabetic_Non_Fasting" : [],
            "BP_Score_systolic" : [],
            "BP_Score_diastolic" : [],
            "BMI" : [],
            "Family_History" : "Y",
            "Smoking" : "Y"
          }
          for (var j = 0; j < 12; j++) {
            $scope.userData[i].record.recovery.Diabetic_Fasting.push(Math.floor(Math.random()*(150-70+1)+70));
            $scope.userData[i].record.recovery.Diabetic_Non_Fasting.push(Math.floor(Math.random()*(220-90+1)+90));
            $scope.userData[i].record.recovery.BP_Score_systolic.push(Math.floor(Math.random()*(100-50+1)+50));
            $scope.userData[i].record.recovery.BP_Score_diastolic.push(Math.floor(Math.random()*(200-80+1)+80));
            $scope.userData[i].record.recovery.BMI.push(Math.floor(Math.random()*(55-15+1)+15));
          }
        }
      }
      console.log($scope.userData);
      $scope.dataDisplay = $scope.userData;
    }

});
