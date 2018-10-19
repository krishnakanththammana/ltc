app.controller('mainCtrl', function($mdDialog,$http, $rootScope, $scope, $state, $mdSidenav, $timeout, $log, MethodFactory, SideNavFactory) {
    console.log("hi from main ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.sideNavFactory = SideNavFactory;
    $scope.toggleLeft = $scope.sideNavFactory.buildDelayedToggler('left');
    $scope.sideNavJSON = $scope.methodFactory.categoriesList;
    $scope.userDetails = $scope.methodFactory.userData;
    $scope.close = function() {
        $mdSidenav('left').close();
    };
    $scope.isOpenLeft = function() {
        return $mdSidenav('left').isOpen();
    };
    $rootScope.prescriptionList = [{
        "name": "Leafy Salad",
        "info": "diet",
        "imageURL":"../images/dietitan.jpg",
        "data": {}
    }, {
        "info": "prescription",
        "imageURL":"../images/doc-lady.png",
        "data": {},
        "name":"Xeljanz",
        "dosage":"200mg",
        "directions":"Morning and Night",
        "quantity":"2/day",
        "date":"08/06/2016",
        "prescribed":"Dr.Bruce Banner",
        "refill":"yes",
        "presimage":"../images/xeljanz2.jpg"
    }, {
        "name": "Leavy Veg Salad",
        "info": "diet",
        "imageURL":"../images/dietitan.jpg",
        "data": {}
    }, {
        "info": "prescription",
        "imageURL":"../images/nurse.jpg",
        "data": {},
        "name":"Anti Depressant",
        "dosage":"200mg",
        "directions":"Morning and Night",
        "quantity":"2/day",
        "date":"08/06/2016",
        "prescribed":"Dr.Bruce Banner",
        "refill":"yes",
        "presimage":"../images/antidepressants.jpg"
    }, {
        "name": "Water intake advice",
        "info": "diet",
        "imageURL":"../images/dietitan.jpg",
        "data": {}
    },{
      "info": "prescription",
      "imageURL":"../images/doc-lady.png",
      "data": {},
      "name":"Aleve",
      "dosage":"400mg",
      "directions":"Morning and Night",
      "quantity":"2/day",
      "date":"10/06/2016",
      "prescribed":"Dr.Tony ",
      "refill":"no",
      "presimage":"../images/aleve.jpg"
    },{
      "info": "prescription",
      "imageURL":"../images/doc-lady.png",
      "data": {},
      "name":"Asprin",
      "dosage":"100mg",
      "directions":"Morning ",
      "quantity":"1/day",
      "date":"10/08/2016",
      "prescribed":"Dr.Barry ",
      "refill":"yes",
      "presimage":"../images/asprin.jpg"
    },{
      "info": "prescription",
      "imageURL":"../images/doc-lady.png",
      "data": {},
      "name":"Advil",
      "dosage":"800mg",
      "directions":" Night",
      "quantity":"1/day",
      "date":"10/09/2016",
      "prescribed":"Dr.Stark ",
      "refill":"no",
      "presimage":"../images/advil.jpg"
    }];

    $scope.prescriptional = function(index) {
        console.log("this function is been called");
        console.log($rootScope.prescriptionList[index].name);
        $scope.prescriptionCount = $rootScope.prescriptionList[index].name
        var data = $rootScope.prescriptionList[index];
        $rootScope.setPrescription(data);
        $scope.prescriptionList.splice(index, 1);
    }
    $scope.dietal = function(index) {
        console.log("this function is been called");
        console.log($rootScope.prescriptionList[index].name);
        $scope.dietCount = $rootScope.prescriptionList[index].name
        console.log($scope.dietCount);
        var data = {
            "name": $scope.dietCount
        };
        $rootScope.setDiet(data);
        $scope.prescriptionList.splice(index, 1);
    }

	 $scope.morePersonal = function(ev) {
        $mdDialog.show({
                controller: 'personalCtrl',
                templateUrl: 'pages/morePersonal.html',
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

    $scope.viewNotification = function(index, ev){
      console.log(index);
      $mdDialog.show({
              controller: 'notificationctrl',
              templateUrl: 'pages/notificationDetail.html',
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

    $scope.setClock = function (data){
      var seconds =  parseInt(data);
      clock = $('#timer').FlipClock({
          clockFace: 'HourlyCounter',
          showSeconds: false,
          autoStart: false,
          callbacks: {
            stop: function() {
              $scope.sweetAlert("No waiting time !!", "there is no waiting time for Emergency now.");
            }
          }
      });
      clock.setTime(seconds);
      clock.setCountdown(true);
      clock.start();
    }

    var clock;
    $scope.timerDetails = function() {
        var req = {
            method: 'GET',
            url: '/GetTimerDetails',
            headers: {
                'Content-Type': 'text/plain'
            }
        }
        var res = $http(req);
        res.success(function(data, status, headers, config) {
          $scope.setClock(data);
        });
        res.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    };
    $scope.timerDetails();

    $scope.bookEmergency = function(){
      var req = {
          method: 'GET',
          url: '/setEmergency',
          headers: {
              'Content-Type': 'text/plain'
          }
      }
      var res = $http(req);
      res.success(function(data, status, headers, config) {
        $scope.setClock(data);
        $scope.sweetAlert("Done!", "Your Emergency Appointment has been booked. Be at the hospital in "+data/60+" minutes");
      });
      res.error(function(data, status, headers, config) {
          alert("failure message: " + JSON.stringify({
              data: data
          }));
      });
    }

    $scope.hideOptions = true;
    $scope.utilityType = "";
    $scope.selectUtility = function(type) {
      $scope.hideOptions = false;
      $scope.utilityType = type;
      if (type == "transfer") {
        setTimeout(function(){
          $scope.sweetAlert("Done!!", "Your Documents have been shared successfully");
        }, 1000);
      }
    }

    $scope.resetUtilities = function() {
      console.log("inside reset");
      $scope.hideOptions = true;
    }

    $scope.paymentDone = function() {
      swal({
          title: "Payment Done!!",
          text: "$20 paid using your default payment option.",
          type: 'success',
          timer: 2000
      }).then(function() {

      });
    }

    $scope.sweetAlert = function(title, message) {
        swal({
            title: title,
            text: message,
            type: 'success',
            timer: 5000
        }).then(function() {

        });
    };
});
