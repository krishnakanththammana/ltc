app.controller('loginCtrl', function($scope, $http, $state, $mdSidenav, $timeout, $log, MethodFactory) {
    console.log("hi from login ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.methodFactory.fetchJSON();
    $scope.methodFactory.fetchDisease();

    $scope.usernameClicked = function(){
      var usernameBox = document.getElementById('username-box');
      usernameBox.className += " animated bounceOutLeft";
      var passwordBox = document.getElementById('password-box');
      passwordBox.style.display = "block";
      passwordBox.className += " animated bounceInRight";
    }
    // methodFactory.changeState('main.overview')

    $scope.login = function(){
      var username = $scope.username;
      console.log(username);
      var data = {"username":username};
      var req2 = {
          method: 'GET',
          url: '/GetUserDetails',
          headers: {
              'Content-Type': 'text/plain'
          },
          params: data
      }
      document.getElementById('theme_css').href = 'css/cancer.css';
      $scope.methodFactory.setUserData({name: "Jack", record: {
        "name":"john",
        "disease":"cancer",
        "symptoms":[{
        "name": "Migrane",
        "imagePath": "../images/migrane.png",
        "description": "Migraine is a primary headache disorder characterized by recurrent headaches that are moderate to severe."
        },{
        "name": "Stomach Pain",
        "imagePath": "../images/stomachpain.png",
        "description": "Abdominal pain is pain that occurs between the chest and pelvic regions."
        }
        ],
        "appointments":[
      
        ],
        "recovery":{
      
        },
        "diet":{
      
        },
        "notifications":[
      
        ],
        "emr":{
      
        },
        "phr":{
      
        }
      });
      $scope.methodFactory.changeState('main.overview');
//       var res2 = $http(req2);
//       res2.success(function(data, status, headers, config) {
//           console.log(data);
//           data[0].record = JSON.parse(data[0].record);
//           $scope.userDetails = data[0];
//           if($scope.userDetails.record.disease == 'cancer'){
//             console.log("cancerrrr");
//             document.getElementById('theme_css').href = 'css/cancer.css';
//           }
//           if($scope.userDetails.record.disease == 'Diabetes'){
//             console.log("diabetes");
//             document.getElementById('theme_css').href = 'css/diabetes.css';
//           }
//           $scope.methodFactory.setUserData($scope.userDetails);
//           $scope.methodFactory.changeState('main.overview');
//       });
//       res2.error(function(data, status, headers, config) {
//           alert("failure message: " + JSON.stringify({
//               data: data
//           }));
//       });
    }

    // var reqProduct = {
    //     method: 'GET',
    //     url: "json/users.json"
    // }
    // console.log(reqProduct);
    // var resProduct = $http(reqProduct);
    // resProduct.success(function(data, status, headers, config) {
    //     console.log("success");
    //     console.log(data);
    //     $scope.users = data;
    //     var name = $scope.users[0].name;
    //     var userObject = $scope.users[0];
    //     userObject = JSON.stringify(userObject);
    //     var data = {"username":name, "record":userObject};
    //     var req2 = {
    //         method: 'GET',
    //         url: '/addRecord',
    //         headers: {
    //             'Content-Type': 'text/plain'
    //         },
    //         params: data
    //     }
    //     var res2 = $http(req2);
    //     res2.success(function(data, status, headers, config) {
    //         console.log(data);
    //     });
    //     res2.error(function(data, status, headers, config) {
    //         alert("failure message: " + JSON.stringify({
    //             data: data
    //         }));
    //     });
    // });
    // resProduct.error(function(data, status, headers, config) {
    //     console.log("failure message: " + JSON.stringify({
    //         data: data
    //     }));
    // });


});
