app.controller('mapCtrl', function($scope, $state, $mdSidenav, $timeout, $log) {
    console.log("hi from map ctrl");

    var $myCanvas = $('#myCanvas');
    $scope.drawMap = function(data) {
      if (data.lanes) {
        if(data.lanes.length > 0) {
          for (var i = 0; i < data.lanes.length; i++) {
            $myCanvas.drawLine({
              strokeStyle: 'steelblue',
              strokeWidth: 10,
              closed: true,
              x1: data.lanes[i].xstart, y1: data.lanes[i].ystart,
              x2: data.lanes[i].xend, y2: data.lanes[i].yend
            });
          }
        }
      }
      if (data.buildings) {
        if (data.buildings.length > 0) {
          for (var i = 0; i < data.buildings.length; i++) {
            $myCanvas.drawRect({
              fillStyle: 'steelblue',
              strokeStyle: 'blue',
              strokeWidth: 4,
              x: data.buildings[i].xcoordinate,
              y: data.buildings[i].ycoordinate,
              fromCenter: false,
              width: data.buildings[i].width,
              height: data.buildings[i].height
            });
            if (data.buildings[i].name) {
              $myCanvas.drawText({
                text: data.buildings[i].name,
                fontFamily: 'cursive',
                fontSize: 20,
                x: data.buildings[i].xcoordinate + (data.buildings[i].width / 2),
                y: data.buildings[i].ycoordinate + (data.buildings[i].height / 2),
                fillStyle: 'lightblue',
                strokeStyle: 'blue',
                strokeWidth: 1
              });
            }
          }
        }
      }
      $myCanvas.drawArc({
        name: 'orangeCircle',
        x: 200, y: 435,
        radius: 15,
        fillStyle: 'green',
        opacity: 1
      });
    }

    $scope.higlightLanes = function(data) {
      $scope.drawMap($scope.mapData.floors[$scope.selectedFloor]);
      for (var i = 0; i < data.length; i++) {
        $myCanvas.drawLine({
          strokeStyle: 'green',
          strokeWidth: 10,
          closed: true,
          x1: data[i].x1, y1: data[i].y1,
          x2: data[i].x2, y2: data[i].y2
        });
        if (data[i].direction == "vertical") {
          var diff =  Math.abs(data[i].y2 - data[i].y1);
          for (var j = 0; j < diff; j+=20) {
            $myCanvas.drawText({
              text: ">",
              fontFamily: 'cursive',
              fontSize: 20,
              x: data[i].x1-1,
              y: data[i].y1 - j,
              fillStyle: 'yellow',
              strokeStyle: 'yellow',
              strokeWidth: 1,
              rotate: 270
            });
          }
        } else {
          if (data[i].towards == "right") {
            var diff =  Math.abs(data[i].x2 - data[i].x1);
            for (var j = 0; j < diff; j+=20) {
              $myCanvas.drawText({
                text: ">",
                fontFamily: 'cursive',
                fontSize: 20,
                x: data[i].x1 + j,
                y: data[i].y1-1,
                fillStyle: 'yellow',
                strokeStyle: 'yellow',
                strokeWidth: 1
              });
            }
          }
          else {
            var diff =  Math.abs(data[i].x2 - data[i].x1);
            for (var j = 0; j < diff; j+=20) {
              $myCanvas.drawText({
                text: ">",
                fontFamily: 'cursive',
                fontSize: 20,
                x: data[i].x1 - j,
                y: data[i].y1 + 1,
                fillStyle: 'yellow',
                strokeStyle: 'yellow',
                strokeWidth: 1,
                rotate: 180
              });
            }
          }
        }
      }
    }

    $scope.selectFloor = function(index) {
      $scope.selectedFloor = index;
      console.log($scope.selectedFloor);
      $scope.drawMap($scope.mapData.floors[$scope.selectedFloor]);
    }

    $scope.selectBuilding = function(index) {
      if (index == 1) {
        var lanes = [{
          "x1":200,
          "x2":200,
          "y1":450,
          "y2":100,
          "direction":"vertical"
        },{
          "x1":200,
          "x2":610,
          "y1":100,
          "y2":100,
          "direction":"horizontal",
          "towards":"right"
        }];
      } else if (index == 0) {
        var lanes = [{
          "x1":200,
          "x2":200,
          "y1":450,
          "y2":300,
          "direction":"vertical"
        },{
          "x1":200,
          "x2":100,
          "y1":300,
          "y2":300,
          "direction":"horizontal",
          "towards":"left"
        }]
      } else if (index == 2) {
        var lanes = [{
          "x1":200,
          "x2":200,
          "y1":450,
          "y2":50,
          "direction":"vertical"
        }];
      }
      $scope.higlightLanes(lanes);
    }

    $scope.mapData = {
      "floors":[{
        "number":"First Floor",
        "lanes":[{
          "xstart": 200,
          "xend": 200,
          "ystart": 0,
          "yend": 450,
          "color": "blue"
        },{
          "xstart": 0,
          "xend": 900,
          "ystart": 300,
          "yend": 300,
          "color": "blue"
        },{
          "xstart": 0,
          "xend": 610,
          "ystart": 100,
          "yend": 100,
          "color": "blue"
        },{
          "xstart": 610,
          "xend": 610,
          "ystart": 100,
          "yend": 400,
          "color": "blue"
        },{
          "xstart": 610,
          "xend": 900,
          "ystart": 400,
          "yend": 400,
          "color": "blue"
        },{
          "xstart": 800,
          "xend": 800,
          "ystart": 400,
          "yend": 300,
          "color": "blue"
        }],
        "buildings":[{
          "xcoordinate": 30,
          "ycoordinate": 320,
          "width": 150,
          "height": 100,
          "name": "Reception"
        },{
          "xcoordinate": 620,
          "ycoordinate": 20,
          "width": 250,
          "height": 250,
          "name": "Doctor's room"
        },{
          "xcoordinate": 10,
          "ycoordinate": 10,
          "width": 175,
          "height": 80,
          "name": "Lab & Reports"
        }]
      },{
        "number":"Second Floor",
        "lanes":[{
          "xstart": 200,
          "xend": 200,
          "ystart": 0,
          "yend": 450,
          "color": "blue"
        },{
          "xstart": 0,
          "xend": 900,
          "ystart": 300,
          "yend": 300,
          "color": "blue"
        },{
          "xstart": 0,
          "xend": 610,
          "ystart": 100,
          "yend": 100,
          "color": "blue"
        },{
          "xstart": 610,
          "xend": 610,
          "ystart": 100,
          "yend": 400,
          "color": "blue"
        },{
          "xstart": 610,
          "xend": 900,
          "ystart": 400,
          "yend": 400,
          "color": "blue"
        },{
          "xstart": 800,
          "xend": 800,
          "ystart": 400,
          "yend": 300,
          "color": "blue"
        }],
        "buildings":[{
          "xcoordinate": 30,
          "ycoordinate": 320,
          "width": 150,
          "height": 100,
          "name": "Lobby"
        },{
          "xcoordinate": 620,
          "ycoordinate": 20,
          "width": 250,
          "height": 250,
          "name": "MRI Scan"
        },{
          "xcoordinate": 10,
          "ycoordinate": 10,
          "width": 175,
          "height": 80,
          "name": "Cashier"
        }]
      }]
    }
});
