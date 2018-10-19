app.controller('symptomsCtrl', function($scope, $state, $mdSidenav, $timeout, $log) {
    console.log("hi from dashboard ctrl");
    $scope.symptoms = [{
        "name":"Fever",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Cough & Cold",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Body pains",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Head ache",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Hair loss",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Stomach issues",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Asthama",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Muscle cramps",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      }
    ]

    $scope.sweetAlert = function(index){
      swal({
        width: 1000,
        height: 900,
        padding: 90,
        background: '#fff',
        html:
          '<h2 class="animated bounceInDown margin-zero">' + '<i class="fa fa-medkit fa-4x symptoms-image"></i>' + '</h2><br>' +
          '<h2>' + $scope.symptoms[index].name + '</h2><br>' +
          '' + $scope.symptoms[index].description
      });
    }
});
