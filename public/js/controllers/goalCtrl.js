app.controller('goalCtrl', function($scope, $state, $mdSidenav, $timeout, $log) {

    $scope.myrange = [];
    var maxSteps = 15000;
    var minSteps = 0;
    var stepMargin = 500;

    for (var i = minSteps; i < maxSteps + 1; i += stepMargin) {
        $scope.myrange.push(i);
    }

    $scope.selectedRange = 0;
    $scope.rangemargin = 0;

    $scope.increase = function() {
        if ($scope.selectedRange > minSteps) {
            $scope.rangemargin += 35;
            $scope.selectedRange -= stepMargin;
        }
    }

    $scope.decrease = function() {
        if ($scope.selectedRange < maxSteps) {
            $scope.rangemargin -= 35;
            $scope.selectedRange += stepMargin;
        }
    }

    $scope.sleepData = [{
        "name": "Today",
        "path": "data.tsv"
    }, {
        "name": "Week",
        "path": "data1.tsv"
    }, {
        "name": "Month",
        "path": "data2.tsv"
    }]

    $scope.selectSleepData = function(index) {
        document.getElementById('sleep-graph').innerHTML = '';
        $scope.sleepGraph($scope.sleepData[index].path);
    }

    $scope.stepsGraph = function() {
        function dashboard(id, fData) {
            var barColor = 'steelblue';

            function segColor(c) {
                return {
                    Count: "#807dba",
                    Remaining: "#e04f14"
                }[c];
            }

            // compute total for each state.
            fData.forEach(function(d) {
                d.total = d.freq.Count + d.freq.Remaining
            });

            // function to handle histogram.
            function histoGram(fD) {
                var hG = {},
                    hGDim = {
                        t: 60,
                        r: 0,
                        b: 30,
                        l: 0
                    };
                hGDim.w = 500 - hGDim.l - hGDim.r,
                    hGDim.h = 300 - hGDim.t - hGDim.b;

                //create svg for histogram.
                var hGsvg = d3.select(id).append("svg")
                    .attr("width", hGDim.w + hGDim.l + hGDim.r)
                    .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
                    .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

                // create function for x-axis mapping.
                var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                    .domain(fD.map(function(d) {
                        return d[0];
                    }));

                // Add x-axis to the histogram svg.
                hGsvg.append("g").attr("class", "x axis")
                    .attr("transform", "translate(0," + hGDim.h + ")")
                    .call(d3.svg.axis().scale(x).orient("bottom"));

                // Create function for y-axis map.
                var y = d3.scale.linear().range([hGDim.h, 0])
                    .domain([0, d3.max(fD, function(d) {
                        return d[1];
                    })]);

                // Create bars for histogram to contain rectangles and freq labels.
                var bars = hGsvg.selectAll(".bar").data(fD).enter()
                    .append("g").attr("class", "bar");

                //create the rectangles.
                bars.append("rect")
                    .attr("x", function(d) {
                        return x(d[0]);
                    })
                    .attr("y", function(d) {
                        return y(d[1]);
                    })
                    .attr("width", x.rangeBand())
                    .attr("height", function(d) {
                        return hGDim.h - y(d[1]);
                    })
                    .attr('fill', barColor)
                    .on("mouseover", mouseover) // mouseover is defined beCount.
                    .on("mouseout", mouseout); // mouseout is defined beCount.

                //Create the frequency labels above the rectangles.
                bars.append("text").text(function(d) {
                        return d3.format(",")(d[1])
                    })
                    .attr("x", function(d) {
                        return x(d[0]) + x.rangeBand() / 2;
                    })
                    .attr("y", function(d) {
                        return y(d[1]) - 5;
                    })
                    .attr("text-anchor", "Remainingdle");

                function mouseover(d) { // utility function to be called on mouseover.
                    // filter for selected state.
                    var st = fData.filter(function(s) {
                            return s.State == d[0];
                        })[0],
                        nD = d3.keys(st.freq).map(function(s) {
                            return {
                                type: s,
                                freq: st.freq[s]
                            };
                        });

                    // call update functions of pie-chart and legend.
                    pC.update(nD);
                    leg.update(nD);
                }

                function mouseout(d) { // utility function to be called on mouseout.
                    // reset the pie-chart and legend.
                    pC.update(tF);
                    leg.update(tF);
                }

                // create function to update the bars. This will be used by pie-chart.
                hG.update = function(nD, color) {
                    // update the domain of the y-axis map to reflect change in frequencies.
                    y.domain([0, d3.max(nD, function(d) {
                        return d[1];
                    })]);

                    // Attach the new data to the bars.
                    var bars = hGsvg.selectAll(".bar").data(nD);

                    // transition the height and color of rectangles.
                    bars.select("rect").transition().duration(500)
                        .attr("y", function(d) {
                            return y(d[1]);
                        })
                        .attr("height", function(d) {
                            return hGDim.h - y(d[1]);
                        })
                        .attr("fill", color);

                    // transition the frequency labels location and change value.
                    bars.select("text").transition().duration(500)
                        .text(function(d) {
                            return d3.format(",")(d[1])
                        })
                        .attr("y", function(d) {
                            return y(d[1]) - 5;
                        });
                }
                return hG;
            }

            // function to handle pieChart.
            function pieChart(pD) {
                var pC = {},
                    pieDim = {
                        w: 250,
                        h: 250
                    };
                pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

                // create svg for pie chart.
                var piesvg = d3.select(id).append("svg")
                    .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                    .attr("transform", "translate(" + pieDim.w / 2 + "," + pieDim.h / 2 + ")");

                // create function to draw the arcs of the pie slices.
                var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

                // create a function to compute the pie slice angles.
                var pie = d3.layout.pie().sort(null).value(function(d) {
                    return d.freq;
                });

                // Draw the pie slices.
                piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                    .each(function(d) {
                        this._current = d;
                    })
                    .style("fill", function(d) {
                        return segColor(d.data.type);
                    })
                    .on("mouseover", mouseover).on("mouseout", mouseout);

                // create function to update pie-chart. This will be used by histogram.
                pC.update = function(nD) {
                        piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                            .attrTween("d", arcTween);
                    }
                    // Utility function to be called on mouseover a pie slice.
                function mouseover(d) {
                    // call the update function of histogram with new data.
                    hG.update(fData.map(function(v) {
                        return [v.State, v.freq[d.data.type]];
                    }), segColor(d.data.type));
                }
                //Utility function to be called on mouseout a pie slice.
                function mouseout(d) {
                    // call the update function of histogram with all data.
                    hG.update(fData.map(function(v) {
                        return [v.State, v.total];
                    }), barColor);
                }
                // Animating the pie-slice requiring a custom function which specifies
                // how the intermediate paths should be drawn.
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                        return arc(i(t));
                    };
                }
                return pC;
            }

            // function to handle legend.
            function legend(lD) {
                var leg = {};

                // create table for legend.
                var legend = d3.select(id).append("table").attr('class', 'legend');

                // create one row per segment.
                var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

                // create the first column for each segment.
                tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                    .attr("width", '16').attr("height", '16')
                    .attr("fill", function(d) {
                        return segColor(d.type);
                    });

                // create the second column for each segment.
                tr.append("td").text(function(d) {
                    return d.type;
                });

                // create the third column for each segment.
                tr.append("td").attr("class", 'legendFreq')
                    .text(function(d) {
                        return d3.format(",")(d.freq);
                    });

                // create the fourth column for each segment.
                tr.append("td").attr("class", 'legendPerc')
                    .text(function(d) {
                        return getLegend(d, lD);
                    });

                // Utility function to be used to update the legend.
                leg.update = function(nD) {
                    // update the data attached to the row elements.
                    var l = legend.select("tbody").selectAll("tr").data(nD);

                    // update the frequencies.
                    l.select(".legendFreq").text(function(d) {
                        return d3.format(",")(d.freq);
                    });

                    // update the percentage column.
                    l.select(".legendPerc").text(function(d) {
                        return getLegend(d, nD);
                    });
                }

                function getLegend(d, aD) { // Utility function to compute percentage.
                    return d3.format("%")(d.freq / d3.sum(aD.map(function(v) {
                        return v.freq;
                    })));
                }

                return leg;
            }

            // calculate total frequency by segment for all state.
            var tF = ['Count', 'Remaining'].map(function(d) {
                return {
                    type: d,
                    freq: d3.sum(fData.map(function(t) {
                        return t.freq[d];
                    }))
                };
            });

            // calculate total frequency by state for all segment.
            var sF = fData.map(function(d) {
                return [d.State, d.total];
            });

            var hG = histoGram(sF), // create the histogram.
                pC = pieChart(tF), // create the pie-chart.
                leg = legend(tF); // create the legend.
        }

        var freqData = [{
            State: 'May',
            freq: {
                Count: 4786,
                Remaining: 1319
            }
        }, {
            State: 'Jun',
            freq: {
                Count: 1101,
                Remaining: 412
            }
        }, {
            State: 'Jul',
            freq: {
                Count: 932,
                Remaining: 2149
            }
        }, {
            State: 'Aug',
            freq: {
                Count: 832,
                Remaining: 1152
            }
        }];

        dashboard('#steps', freqData);
    }
    $scope.stepsGraph();

    $scope.weightGraph = function() {
        var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var formatPercent = d3.format(".0%");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1, 1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

        var svg = d3.select("#weight-graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("weight.tsv", function(error, data) {

            data.forEach(function(d) {
                d.frequency = +d.frequency;
            });

            x.domain(data.map(function(d) {
                return d.letter;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.frequency;
            })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Weight");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return x(d.letter);
                })
                .attr("width", x.rangeBand())
                .attr("y", function(d) {
                    return y(d.frequency);
                })
                .attr("height", function(d) {
                    return height - y(d.frequency);
                });

            d3.select("#weight-chkbox").on("change", change);

            var sortTimeout = setTimeout(function() {
                d3.select("#weight-chkbox").property("checked", true).each(change);
            }, 2000);

            function change() {
                clearTimeout(sortTimeout);

                // Copy-on-write since tweens are evaluated after a delay.
                var x0 = x.domain(data.sort(this.checked ?

                            function(a, b) {
                                return b.frequency - a.frequency;
                            } :
                            function(a, b) {
                                return d3.ascending(a.letter, b.letter);
                            })
                        .map(function(d) {
                            return d.letter;
                        }))
                    .copy();

                svg.selectAll(".bar")
                    .sort(function(a, b) {
                        return x0(a.letter) - x0(b.letter);
                    });

                var transition = svg.transition().duration(750),
                    delay = function(d, i) {
                        return i * 50;
                    };

                transition.selectAll(".bar")
                    .delay(delay)
                    .attr("x", function(d) {
                        return x0(d.letter);
                    });

                transition.select(".x.axis")
                    .call(xAxis)
                    .selectAll("g")
                    .delay(delay);
            }
        });
    }
      $scope.weightGraph ();
    $scope.distanceGraph = function() {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var parseDate = d3.time.format("%d-%b-%y").parse;

      var x = d3.time.scale()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close); });

      var svg = d3.select("#distance-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.tsv("distance.tsv", function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return d.close; })]);

      svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Distance (Km)");
      });
    }
    $scope.distanceGraph();

    $scope.caloriesgraph = function() {
        var todaycal = liquidFillGaugeDefaultSettings();
        todaycal.circleColor = "#D4AB6A";
        todaycal.textColor = "#553300";
        todaycal.waveTextColor = "#805615";
        todaycal.waveColor = "#AA7D39";
        todaycal.circleThickness = 0.1;
        todaycal.circleFillGap = 0.2;
        todaycal.textVertPosition = 0.8;
        todaycal.waveAnimateTime = 2000;
        todaycal.waveHeight = 0.3;
        todaycal.waveCount = 1;
        var todayCalGraph = loadLiquidFillGauge("today-calories", 78, todaycal);
        var weekCalGraph = loadLiquidFillGauge("week-calories", 67, todaycal);
        var monthCalGraph = loadLiquidFillGauge("month-calories", 50, todaycal);
    }
    $scope.caloriesgraph();

    $scope.sleepGraph = function(path) {
        var margin = {
                top: 20,
                right: 30,
                bottom: 40,
                left: 30
            },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([0, height], 0.1);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(0)
            .tickPadding(6);

        var svg = d3.select("#sleep-graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv(path, type, function(error, data) {
            x.domain(d3.extent(data, function(d) {
                return d.value;
            })).nice();
            y.domain(data.map(function(d) {
                return d.name;
            }));

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", function(d) {
                    return "bar bar--" + (d.value < 0 ? "negative" : "positive");
                })
                .attr("x", function(d) {
                    return x(Math.min(0, d.value));
                })
                .attr("y", function(d) {
                    return y(d.name);
                })
                .attr("width", function(d) {
                    return Math.abs(x(d.value) - x(0));
                })
                .attr("height", y.rangeBand());

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x(0) + ",0)")
                .call(yAxis);
        });

        function type(d) {
            d.value = +d.value;
            return d;
        }
    }
    $scope.sleepGraph("data.tsv");

});
