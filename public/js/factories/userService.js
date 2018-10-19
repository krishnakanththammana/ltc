app.factory('MethodFactory', function($http, $state, $timeout, $mdSidenav, $log) {
    var methodFactory = {};

    methodFactory.categoriesList = null;
    methodFactory.diseaseList = null;
    methodFactory.doctorList = null;
    methodFactory.userData = null;
    methodFactory.doctors = [{
        "name":"Molly Cooper",
        "department":"Ortho",
        "imagepath":"../images/doc-lady.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"Peter Parker",
        "department":"Ortho",
        "imagepath":"../images/doc2.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"Bruce Banner",
        "department":"Ortho",
        "imagepath":"../images/doc5.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"Tony Stark",
        "department":"Ortho",
        "imagepath":"../images/doc4.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"Albus Dumbledore",
        "department":"Ortho",
        "imagepath":"../images/doc6.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"James Potter",
        "department":"Ortho",
        "imagepath":"../images/doc7.jpg",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    },{
        "name":"Severus Snape",
        "department":"Ortho",
        "imagepath":"../images/doc8.png",
        "email":"doctor@hospital.com",
        "phone":"+1 515 212 2222"
    }];

    methodFactory.changeState = function(state) {
      $state.go(state);
    }

    methodFactory.setUserData = function(data) {
      methodFactory.userData = data;
    }

    methodFactory.fetchJSON = function() {
      var reqProduct = {
          method: 'GET',
          url: "json/sidenav.json"
      }
      console.log(reqProduct);
      var resProduct = $http(reqProduct);
      resProduct.success(function(data, status, headers, config) {
          console.log("success");
          console.log(data);
          methodFactory.categoriesList = data;
      });
      resProduct.error(function(data, status, headers, config) {
          console.log("failure message: " + JSON.stringify({
              data: data
          }));
      });
    };

    methodFactory.fetchDisease = function() {
      var reqProduct = {
          method: 'GET',
          url: "json/disease.json"
      }
      console.log(reqProduct);
      var resProduct = $http(reqProduct);
      resProduct.success(function(data, status, headers, config) {
          console.log("success");
          console.log(data);
          methodFactory.diseaseList = data;
      });
      resProduct.error(function(data, status, headers, config) {
          console.log("failure message: " + JSON.stringify({
              data: data
          }));
      });
    };

    return methodFactory;
});
