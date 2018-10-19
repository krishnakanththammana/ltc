app.controller('communityCtrl', function($scope, $state, $mdSidenav, $timeout, $log) {
    console.log("hi from community ctrl");
    var successCard = "md-whiteframe-14dp success-stories-card";
    var blogCard = "md-whiteframe-14dp blog-card";
    //document.getElementById("MyElement").className += " MyClass";
    $scope.success = [{
      "name": "How I overcame cancer",
      "imageURL": "../images/success1.jpg",
      "description": "description of post 1"
    },{
      "name": "How I won over Depression",
      "imageURL": "../images/doc3.jpg",
      "description": "description of post 2"
    },{
      "name": "Stay Fit !!",
      "imageURL": "../images/success3.jpg",
      "description": "description of post 3"
    },{
      "name": "See how Jim fought Lung Cancer",
      "imageURL": "../images/success4.jpg",
      "description": "description of post 4"
    }];

    $scope.blogPosts = [{
      "name": "Veggy Diet",
      "imageURL": "../images/blog1.jpg",
      "description": "description of post 1"
    },{
      "name": "Eggs diet",
      "imageURL": "../images/blog2.jpg",
      "description": "description of post 2"
    },{
      "name": "Meat Lovers",
      "imageURL": "../images/blog3.jpg",
      "description": "description of post 3"
    },{
      "name": "Fruit Diet",
      "imageURL": "../images/blog4.jpg",
      "description": "description of post 4"
    },{
      "name": "Juice Diet",
      "imageURL": "../images/blog5.jpg",
      "description": "description of post 5"
    },{
      "name": "Fasting",
      "imageURL": "../images/blog6.png",
      "description": "description of post 5"
    }];

    $scope.community = true;
    $scope.changemenu = function(type) {
      console.log(type);
      if (type == 'community') {
        if (!$scope.community) {
          $scope.community = true;
          document.getElementById("blog-card").className = blogCard + " animated rotateOutDownRight";
          setTimeout(function(){
            document.getElementById("blog-card").className = blogCard + " display-none";
            document.getElementById("success-stories-card").className = successCard + " animated rotateInDownLeft";
          }, 200);
          console.log("change to community");
        }
      }
      if (type == 'blog') {
        if ($scope.community) {
          $scope.community = false;
          document.getElementById("success-stories-card").className = successCard + " animated rollOut";
          setTimeout(function(){
            document.getElementById("success-stories-card").className = successCard + " display-none";
            document.getElementById("blog-card").className = blogCard + " animated rollIn";
          }, 200);
          console.log("change to blog");
        }
      }
    }
});
