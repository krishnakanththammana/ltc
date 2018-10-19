app.controller('personalCtrl', function($rootScope, $scope, $state, $mdSidenav, $timeout, $mdDialog, $log, MethodFactory) {
    console.log("hi from personal ctrl");
    $scope.personal = [{
        "name":"Thomas",
        "department":"Emergency Contact 1",
		    "type":"contact",
        "imagepath":"../images/doc3.jpg",
        "email":"thomas@someMail.com",
        "phone":"+1 515 534 9012"
    },{
        "name":"Greg Thomson",
        "department":"Emergency Contact 2",
		    "type":"contact",
        "imagepath":"../images/success4.jpg",
        "email":"thomson_greg@someMail.com",
        "phone":"+1 515 155 4645"
    }];

    $scope.morePersonal = [{
        "name":"Barry Allen",
        "department":"Physician",
		    "type":"physician",
        "imagepath":"../images/physician.jpg",
        "email":"physician@hospital.com",
        "phone":"+1 515 212 2475"
    },{
        "name":"Molly Cooper",
        "department":"Dietitian",
		    "type":"dietitian",
        "imagepath":"../images/dietitan.jpg",
        "email":"dietitian@hospital.com",
        "phone":"+1 515 212 2523"
    },{
        "name":"Hudson",
        "department":"Nurse",
		    "type":"nurse",
        "imagepath":"../images/nurse.jpg",
        "email":"nurse@hospital.com",
        "phone":"+1 515 212 4578"

    }];


});
