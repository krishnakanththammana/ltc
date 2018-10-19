app.controller('servicesCtrl', function($scope, $rootScope, $state, $mdSidenav, $timeout, $log, $mdDialog) {
    console.log("hi from service ctrl");
    $rootScope.servicesList = [{
        "name":"physiotherapy",
        "backgroundimage":"../images/Physiotherapy1.jpg",
        "iconClass":"fa fa-male fa-4x",
        "description":"Physical therapy or physiotherapy  is a physical medicine and rehabilitation specialty that remediates impairments and promotes mobility."
      },{
        "name":"Trained Attendants",
		    "backgroundimage":"../images/attendant.jpg",
        "iconClass":"fa fa-users fa-4x",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Nursing",
		    "backgroundimage":"../images/nurse2.jpg",
        "iconClass":"fa fa-hospital-o fa-4x",
        "description":"Nursing is a profession within the health care sector focused on the care of individuals, families so they may attain, or recover optimal health and quality of life."
      },{
        "name":"Vaccination",
		    "backgroundimage":"../images/vaccination.jpg",
        "iconClass":"fa fa-times-circle fa-4x",
        "description":"Vaccination is the administration of antigenic material (a vaccine) to stimulate an individual's immune system to develop adaptive immunity to a pathogen."
      },{
        "name":"Lab Tests",
		    "backgroundimage":"../images/lab-test.png",
        "iconClass":"fa fa-flask fa-4x",
        "description":"A medical laboratory or clinical laboratory is a laboratory where tests are usually done on clinical specimens in order to obtain information about the health."
      },{
        "name":"Medical Equipment",
		    "backgroundimage":"../images/medical-equipment.jpg",
        "iconClass":"fa fa-ship fa-4x",
        "description":"Medical equipment (also known as armamentarium) is designed to aid in the diagnosis, monitoring or treatment of medical conditions."
      },{
        "name":"Doctor Consultation",
		    "backgroundimage":"../images/doctor-consultation.jpg",
        "iconClass":"fa fa-stethoscope fa-4x",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      },{
        "name":"Elder Care",
		    "backgroundimage":"../images/elder-care.jpg",
        "iconClass":"fa fa-wheelchair fa-4x",
        "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
      }
    ]

    $rootScope.selectedService = null;
    $scope.selectService  = function(index, ev) {
      $rootScope.selectedService = index;
      $mdDialog.show({
          controller: 'serviceDialogCtrl',
          templateUrl: 'pages/serviceDetails.html',
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

    $scope.registerService = function() {
      swal(
        'Done!',
        'You have been registerd to this service!',
        'success'
      )
    }
});
