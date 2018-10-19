app.controller('dashboardCtrl', function($rootScope, $scope, $http, $state, $mdSidenav, $timeout, $mdDialog, $log, MethodFactory) {
    console.log("hi from dashboard ctrl");
    $scope.methodFactory = MethodFactory;
    $scope.sideNavJSON = $scope.methodFactory.categoriesList;
    $scope.diseaseJSON = $scope.methodFactory.diseaseList;
    $scope.userDetails = $scope.methodFactory.userData;
    console.log($scope.userDetails);
    if (!$scope.userDetails.record.prescriptions) {
        $scope.userDetails.record.prescriptions = [];
    }
    var i;
    var top;
    $scope.scroll = function(){
      top = 200;
      i = 0;
      $scope.callAtTimeout();
    };

    $scope.selectedRecovey = 0;
    $scope.selectRecovery = function(index){
      $scope.selectedRecovey = index;
    }

    $scope.callAtTimeout = function() {
        var duration = 400;
        console.log(top);
        console.log(i);
        if(i < top){
          $("#main-ui-scroll").scrollTop(i, duration);
          $timeout( function(){i++;$scope.callAtTimeout();}, 0.001);
        }
    }
    $scope.chatOpened = false;
    $scope.toggleChat = function() {
      $scope.chatOpened = !$scope.chatOpened;
    }

    $scope.doctors = $scope.methodFactory.doctors;
    $scope.diseaseIndex = 0;
    $scope.navOpened = true;
    $rootScope.isDoctorSelected = false;

    var diseaseName = $scope.userDetails.record.disease;
    for (var i = 0; i < $scope.diseaseJSON.length; i++) {
        if (diseaseName == $scope.diseaseJSON[i].overview.title) {
            $scope.disease = $scope.diseaseJSON[i];
            console.log($scope.disease);
        }
    }

    $scope.removeAppointment = function(index) {
      console.log(index);
      $scope.userDetails.record.appointments.splice(index, 1);
      var name = $scope.userDetails.name
      var record = $scope.userDetails.record;
      record = JSON.stringify(record);
      var data = {
          "name": name,
          "record": record
      };
      var req2 = {
          method: 'GET',
          url: '/updateUser',
          headers: {
              'Content-Type': 'text/plain'
          },
          params: data
      }
      var res2 = $http(req2);
      res2.success(function(data, status, headers, config) {
          console.log(data);
          $scope.methodFactory.setUserData($scope.userDetails);
          $scope.sweetremoveApponiment();
      });
      res2.error(function(data, status, headers, config) {
          alert("failure message: " + JSON.stringify({
              data: data
          }));
      });
    }
    
    $scope.sweetremoveApponiment = function() {
        swal({
            title: 'Done!',
            text: 'Apponiment Cancelled',
            type: 'success',
            timer: 2000
        }).then(function() {

        });
    }

    $rootScope.setPrescription = function(prescription) {
        console.log($scope.userDetails.record.prescriptions);
        $scope.userDetails.record.prescriptions.push(prescription);
        var name = $scope.userDetails.name
        var record = $scope.userDetails.record;
        record = JSON.stringify(record);
        var data = {
            "name": name,
            "record": record
        };
        var req2 = {
            method: 'GET',
            url: '/updateUser',
            headers: {
                'Content-Type': 'text/plain'
            },
            params: data
        }
        var res2 = $http(req2);
        res2.success(function(data, status, headers, config) {
            console.log(data);
            $scope.methodFactory.setUserData($scope.userDetails);
            $scope.sweetPrescription();
        });
        res2.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    };

	$rootScope.setTimer = function(timal, index) {
		console.log($scope.userDetails.record.prescriptions);
        if (!$scope.userDetails.record.prescriptions[index].reminder) {
            $scope.userDetails.record.prescriptions[index].reminder = [];
        }
		console.log($scope.userDetails.record.prescriptions[index]);
        $scope.userDetails.record.prescriptions[index].reminder.push(timal);
        var name = $scope.userDetails.name
        var record = $scope.userDetails.record;
        record = JSON.stringify(record);
        var data = {
            "name": name,
            "record": record
        };
        var req2 = {
            method: 'GET',
            url: '/updateUser',
            headers: {
                'Content-Type': 'text/plain'
            },
            params: data
        }
        var res2 = $http(req2);
        res2.success(function(data, status, headers, config) {
            console.log(data);
            $scope.methodFactory.setUserData($scope.userDetails);
        });
        res2.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    };



    $rootScope.setDiet = function(diet) {
        console.log($scope.userDetails.record.diet);
        if (!$scope.userDetails.record.diet.details) {
            $scope.userDetails.record.diet.details = [];
        }
        $scope.userDetails.record.diet.details.push(diet);
        var name = $scope.userDetails.name
        var record = $scope.userDetails.record;
        record = JSON.stringify(record);
        var data = {
            "name": name,
            "record": record
        };
        var req2 = {
            method: 'GET',
            url: '/updateUser',
            headers: {
                'Content-Type': 'text/plain'
            },
            params: data
        }
        var res2 = $http(req2);
        res2.success(function(data, status, headers, config) {
            console.log(data);
            $scope.methodFactory.setUserData($scope.userDetails);
            $scope.sweetDiet();
        });
        res2.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    };

    $scope.resetDoc = function() {
        $rootScope.isDoctorSelected = false;
    }

    $scope.toggleBubbles = function() {
        $scope.navOpened = !$scope.navOpened;
    }

    $scope.setDiseaseIndex = function(index) {
        $scope.diseaseIndex = index;
    }

    $scope.selectAppointment = function(index) {
        console.log(index);
    }

    $scope.setAppointment = function() {
        console.log("date:" + $scope.appointmentDate);
        var time = document.getElementById("alarm").value;
        $rootScope.isDoctorSelected = false;
        $scope.userDetails.record.appointments.push({
            'date': $scope.appointmentDate,
            'time': time,
            'doctor': $scope.doctors[$rootScope.selectedDocIndex].name,
            'imagePath': $scope.doctors[$rootScope.selectedDocIndex].imagepath,
            'location': "ABC Hospital"
        });

        document.getElementById("departure").value = "";
        document.getElementById("alarm").value = "";
        var name = $scope.userDetails.name
        var record = $scope.userDetails.record;
        record = JSON.stringify(record);
        var data = {
            "name": name,
            "record": record
        };
        var req2 = {
            method: 'GET',
            url: '/updateUser',
            headers: {
                'Content-Type': 'text/plain'
            },
            params: data
        }
        var res2 = $http(req2);
        res2.success(function(data, status, headers, config) {
            console.log(data);
            $scope.methodFactory.setUserData($scope.userDetails);
            $scope.sweetAlert();
        });
        res2.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    }
	 $scope.selectDiet = function(index, ev){
      console.log(index);
      $mdDialog.show({
              controller: 'dietDialogCtrl',
              templateUrl: 'pages/dietDetails.html',
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
	$scope.selectSymptoms = function(index, ev){
      console.log(index);
      $mdDialog.show({
              controller: 'symptomDialogCtrl',
              templateUrl: 'pages/symptomsDetails.html',
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
	$scope.selectPrescription = function( ev){

      $mdDialog.show({
              controller: 'prescriptionDialogCtrl',
              templateUrl: 'pages/prescriptionDetails.html',
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
    $scope.selectMoreDetails = function(index, ev){
       console.log(index);
       $mdDialog.show({
               controller: 'timelineDialogCtrl',
               templateUrl: 'pages/timelineDetails.html',
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
     $scope.selectRecommendedDiet = function(index, ev){
        console.log(index);
        $mdDialog.show({
                controller: 'dietRecommendedCtrl',
                templateUrl: 'pages/dietRecommended.html',
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
  	$scope.selectGeneralDiet = function(index, ev){
        console.log(index);
        $mdDialog.show({
                controller: 'dietGeneralCtrl',
                templateUrl: 'pages/dietGeneral.html',
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
    $scope.selectDoctor = function(ev) {
        $mdDialog.show({
                controller: 'doctorCtrl',
                templateUrl: 'pages/selectDoctor.html',
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

    $scope.sweetAlert = function() {
        swal({
            title: 'Done!',
            text: 'Appointment fixed!',
            type: 'success',
            timer: 2000
        }).then(function() {

        });
    };

    $scope.sweetDiet = function() {
        swal({
            title: 'Done!',
            text: 'Added it to your Diet!',
            type: 'success',
            timer: 2000
        }).then(function() {

        });
    };

    $scope.sweetPrescription = function() {
        swal({
            title: 'Done!',
            text: 'Added it to your Prescriptions!',
            type: 'success',
            timer: 2000
        }).then(function() {

        });
    };

    $scope.showDetails = function(index, ev, event){
      console.log(event);
      swal({
        title: event.title,
        showConfirmButton: false,
        html: event.content
      })
    }

    // timeline graph start
    $scope.side = '';

    $scope.events = [{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-registered',
        title: 'Registration at clinic',
		    type:'registration',
        when: '1 month ago ',
        content: 'User has registered himself at the clinic.'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-plus-circle',
        title: 'Appointment',
		    type:'appoitment',
        when: '25 days ago',
        content: 'Appointment fixed with Dr.Mycroft '
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-car',
        title: 'First Visit',
		    type:'visit',
        when: '25 days ago ',
        content: 'First Visit to Dr.Mycroft'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-pencil-square-o',
        title: 'Intial Diagnosis',
		    type:'diagnosis',
        when: '25 days ago ',
        content: 'Intial Diagnosis done by primary Doctor'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-hospital-o',
        title: 'Hospitalized',
		    type:'treatment',
        when: '20 days ago ',
        content: 'Admitted in hospital'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-file-text-o',
        title: 'Prescription',
		    type:'prescription',
        when: '18 days ago ',
        content: 'Dr.Mycroft prescribed medication'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-cutlery',
        title: 'Diet Recomendation',
		    type:'diet',
        when: '16 days ago',
        content: 'Recommended diet by Dietisian'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-birthday-cake',
        title: 'Personal Event',
		    type:'personal',
        when: '12 days ago ',
        content: 'My Mom Birthday'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-file-text-o',
        title: 'Diagnosis',
		    type:'diagnosis',
        when: '10 days ago ',
        content: 'Diagnoised by Dr.Mycroft'
    },{
        badgeClass: 'primary',
        badgeIconClass: 'fa fa-check',
        title: 'Results shared with Doctor',
		    type:'result',
        when: '8 days ago ',
        content: 'Results shared to Dr.Mycroft'
    }];
    $rootScope.eventsGlobal = $scope.events;
    // timeline graph end


    $scope.recoveryData = [{
      "value":"0",
      "name":"Michael"
    },{
      "value":"0",
      "name":"Monica"
    },{
      "value":"0",
      "name":"Chandler"
    },{
      "value":"0",
      "name":"Travis"
    },{
      "value":"0",
      "name":"Sam"
    },{
      "value":"0",
      "name":"Joey"
    },{
      "value":"0",
      "name":"Alan"
    },{
      "value":"0",
      "name":"Ross"
    },{
      "value":"0",
      "name":"Rachel"
    },{
      "value":"0",
      "name":"Jordan"
    }];

    var dataArray = ["40", "60", "55", "32", "11", "66", "25", "45", "21", "05"];
    $scope.wellnessScore = false;
    $scope.showData = function(type){
      console.log("inside show data");
      var displayNone = "display-none";
      var recoveryCardClassname = "recovery-chart md-whiteframe-12dp recovery-score "
      var recoveryOverviewClassname = "recovery-chart md-whiteframe-12dp recovery-overview "
      if (type == 'score') {
        $scope.wellnessScore = true;
        document.getElementById("wellness-overview").className = recoveryOverviewClassname + displayNone;
        document.getElementById("wellness-score").className = recoveryCardClassname;
        $scope.displayResultRec();
      } else {
        $scope.wellnessScore = false;
        document.getElementById("wellness-score").className = recoveryCardClassname + displayNone;
        document.getElementById("wellness-overview").className = recoveryOverviewClassname;
      }
    }

    $scope.displayResultRec = function(){
      $timeout(function(){
        $scope.patientIndex = Math.floor(Math.random() * 10);
        for (var i = 0; i < dataArray.length; i++) {
          $scope.recoveryData[i].value = dataArray[i]
        }
      },500);
    }


    // recovery graph start

    $scope.drawRecoveryGraph = function(){
      var w = 600;                        //width
  		var h = 500;                        //height
  		var padding = {top: 40, right: 40, bottom: 40, left:40};
  		var dataset;
  		//Set up stack method
  		var stack = d3.layout.stack();

  		d3.json("mperday.json",function(json){
  			dataset = json;

  			//Data, stacked
  			stack(dataset);

  			var color_hash = {
  				    0 : ["Invite","#1f77b4"],
  					1 : ["Accept","#2ca02c"],
  					2 : ["Decline","#ff7f0e"]

  			};


  			//Set up scales
  			var xScale = d3.time.scale()
  				.domain([new Date(dataset[0][0].time),d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),8)])
  				.rangeRound([0, w-padding.left-padding.right]);

  			var yScale = d3.scale.linear()
  				.domain([0,
  					d3.max(dataset, function(d) {
  						return d3.max(d, function(d) {
  							return d.y0 + d.y;
  						});
  					})
  				])
  				.range([h-padding.bottom-padding.top,0]);

  			var xAxis = d3.svg.axis()
  						   .scale(xScale)
  						   .orient("bottom")
  						   .ticks(d3.time.days,1);

  			var yAxis = d3.svg.axis()
  						   .scale(yScale)
  						   .orient("left")
  						   .ticks(10);



  			//Easy colors accessible via a 10-step ordinal scale
  			var colors = d3.scale.category10();

  			//Create SVG element
  			var svg = d3.select("#mbars")
  						.append("svg")
  						.attr("width", w)
  						.attr("height", h);

  			// Add a group for each row of data
  			var groups = svg.selectAll("g")
  				.data(dataset)
  				.enter()
  				.append("g")
  				.attr("class","rgroups")
  				.attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
  				.style("fill", function(d, i) {
  					return color_hash[dataset.indexOf(d)][1];
  				});

  			// Add a rect for each data value
  			var rects = groups.selectAll("rect")
  				.data(function(d) { return d; })
  				.enter()
  				.append("rect")
  				.attr("width", 2)
  				.style("fill-opacity",1e-6);


  			rects.transition()
  			     .duration(function(d,i){
  			    	 return 500 * i;
  			     })
  			     .ease("linear")
  			    .attr("x", function(d) {
  					return xScale(new Date(d.time));
  				})
  				.attr("y", function(d) {
  					return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
  				})
  				.attr("height", function(d) {
  					return -yScale(d.y) + (h - padding.top - padding.bottom);
  				})
  				.attr("width", 15)
  				.style("fill-opacity",1);

  				svg.append("g")
  					.attr("class","x axis")
  					.attr("transform","translate(40," + (h - padding.bottom) + ")")
  					.call(xAxis);


  				svg.append("g")
  					.attr("class","y axis")
  					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
  					.call(yAxis);

  				// adding legend



  				svg.append("text")
  				.attr("transform","rotate(-90)")
  				.attr("y", 0 - 5)
  				.attr("x", 0-(h/2))
  				.attr("dy","1em")
          .attr("font-weight","bold")
  				.text("Reading");

  			svg.append("text")
  			   .attr("class","xtext")
  			   .attr("x",w/2 - padding.left)
  			   .attr("y",h - 5)
  			   .attr("text-anchor","middle")
           .attr("font-weight","bold")
  			   .text("Date");

  			//On click, update with new data
  			d3.selectAll(".m")
  				.on("click", function() {
  					var date = this.getAttribute("value");

  					var str;
  					if(date == "2014-02-19"){
  						str = "19.json";
  					}else if(date == "2014-02-20"){
  						str = "20.json";
  					}else if(date == "2014-02-21"){
  						str = "21.json";
  					}else if(date == "2014-02-22"){
  						str = "22.json";
  					}else{
  						str = "23.json";
  					}

  					d3.json(str,function(json){

  						dataset = json;
  						stack(dataset);

  						console.log(dataset);

  						xScale.domain([new Date(0, 0, 0,dataset[0][0].time,0, 0, 0),new Date(0, 0, 0,dataset[0][dataset[0].length-1].time,0, 0, 0)])
  						.rangeRound([0, w-padding.left-padding.right]);

  						yScale.domain([0,
  										d3.max(dataset, function(d) {
  											return d3.max(d, function(d) {
  												return d.y0 + d.y;
  											});
  										})
  									])
  									.range([h-padding.bottom-padding.top,0]);

  						xAxis.scale(xScale)
  						     .ticks(d3.time.hour,2)
  						     .tickFormat(d3.time.format("%H"));

  						yAxis.scale(yScale)
  						     .orient("left")
  						     .ticks(10);

  						 groups = svg.selectAll(".rgroups")
  		                    .data(dataset);

  		                    groups.enter().append("g")
  		                    .attr("class","rgroups")
  		                    .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
  		                    .style("fill",function(d,i){
  		                        return color(i);
  		                    });


  		                    rect = groups.selectAll("rect")
  		                    .data(function(d){return d;});

  		                    rect.enter()
  		                      .append("rect")
  		                      .attr("x",w)
  		                      .attr("width",1)
  		                      .style("fill-opacity",1e-6);

  		                rect.transition()
  		                    .duration(1000)
  		                    .ease("linear")
  		                    .attr("x",function(d){
  		                        return xScale(new Date(0, 0, 0,d.time,0, 0, 0));
  		                    })
  		                    .attr("y",function(d){
  		                        return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
  		                    })
  		                    .attr("height",function(d){
  		                        return -yScale(d.y) + (h - padding.top - padding.bottom);
  		                    })
  		                    .attr("width",15)
  		                    .style("fill-opacity",1);

  		                rect.exit()
  					       .transition()
  					       .duration(1000)
  					       .ease("circle")
  					       .attr("x",w)
  					       .remove();

  		                groups.exit()
  					       .transition()
  					       .duration(1000)
  					       .ease("circle")
  					       .attr("x",w)
  					       .remove();


  						svg.select(".x.axis")
  						   .transition()
  						   .duration(1000)
  						   .ease("circle")
  						   .call(xAxis);

  						svg.select(".y.axis")
  						   .transition()
  						   .duration(1000)
  						   .ease("circle")
  						   .call(yAxis);

  						svg.select(".xtext")
  						   .text("Date");

  						svg.select(".title")
  				        .text("Number of messages per hour on " + date + ".");
  					});
  				});


  		});
    }

    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;
    config1.displayPercent = false;
    gauge2= loadLiquidFillGauge("fillgauge2", 28, config1);
    var config2 = liquidFillGaugeDefaultSettings();
    config2.circleColor = "#D4AB6A";
    config2.textColor = "#553300";
    config2.waveTextColor = "#805615";
    config2.waveColor = "#AA7D39";
    config2.circleThickness = 0.1;
    config2.circleFillGap = 0.2;
    config2.textVertPosition = 0.8;
    config2.waveAnimateTime = 2000;
    config2.waveHeight = 0.3;
    config2.waveCount = 1;
    config2.displayPercent = false;
    gauge3 = loadLiquidFillGauge("fillgauge3", 60.1, config2);
    var config3 = liquidFillGaugeDefaultSettings();
    config3.textVertPosition = 0.8;
    config3.waveAnimateTime = 5000;
    config3.waveHeight = 0.15;
    config3.waveAnimate = false;
    config3.waveOffset = 0.25;
    config3.valueCountUp = false;
    config3.displayPercent = false;
    gauge4 = loadLiquidFillGauge("fillgauge4", 50, config3);
    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.15;
    config4.circleColor = "#808015";
    config4.textColor = "#555500";
    config4.waveTextColor = "#FFFFAA";
    config4.waveColor = "#AAAA39";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;
    config4.displayPercent = false;
    gauge5 = loadLiquidFillGauge("fillgauge5", 60.44, config4);

     $scope.drawRecoveryGraph();
    // recovery graph end
});
var gauge2, gauge3, gauge4, gauge5;
function NewValue(){
    if(Math.random() > .5){
        return Math.round(Math.random()*100);
    } else {
        return (Math.random()*100).toFixed(1);
    }
}
