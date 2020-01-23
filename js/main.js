angular.module('myApp', ['myApp.directives']);


/*Controllers*/
function MyCtrl($scope, $http, limitToFilter) {
  // Global Variables for charts
  $scope.sensor1data = []; 
  $scope.sensor3data = [];
  
  /*API Call function for sensor1*/
  $scope.fetchsensor1data = function(){
  
	$http({
	method: 'GET',
	url: 'api/sensor1.php'
		})
	.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.sensor1data.push([(new Date()).getTime(),response.data.data[0]]);
	}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	});
		
	//Set timer delay for async call
	setTimeout(function() {
		$scope.fetchsensor1data();
	}, 1000);
  }
  
  /*API Call function for sensor2*/
  $scope.fetchsensor2data = function(){
  
    $http({
	method: 'GET',
	url: 'api/sensor2.php'
		})
	.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			if(response.data.data == '0')
			{
				$('#doorclose').click();
			}
			else
			{
				$('#dooropen').click();
			}
	}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	});
  
	//Set timer delay for async call
	setTimeout(function() {
		$scope.fetchsensor2data();
	}, 5000);
  }
  
  
  /*API Call function for sensor3*/
  $scope.fetchsensor3data = function(){
  
	$http({
	method: 'GET',
	url: 'api/sensor3.php'
		})
	.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.sensor3data = response.data.data;
	}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	});
  
	//Set timer delay for async call
	setTimeout(function() {
		$scope.fetchsensor3data();
	}, 10000);
  }

  // Start the watch functions
  $scope.fetchsensor1data();
  $scope.fetchsensor2data();
  $scope.fetchsensor3data();
}



/* Directives */
angular.module('myApp.directives',[])
.directive('hcSeries', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      continuousdata: '='
    },
    controller: function ($scope, $element, $attrs) {
      console.log($element);

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
      console.log(element);
	  
	  	Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
	  
	  // Set Highchart options for Sensor1
      var chart = new Highcharts.Chart({
        chart: {
		  type: 'spline',
		  animation: Highcharts.svg,
		  marginRight: 10,
          renderTo: element[0]
        },
        title: {
          text: 'Sensor1 Data plot'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          plotLines: [{
            value: 0,
            width: 1,
            color: '#F0AD4E'
          }]
        },
        tooltip: {
          percentageDecimals: 1
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000'
            }
          }
        },
        series: [{
          name: 'Sensor1',
          data: scope.continuousdata,
		  color: '#f3b74c'
        }]
      });
	
	// Watch function to check the change in data from api call
    scope.$watch("continuousdata", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
      
    }
  }
})
.directive('hcDiscrete', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      discretedata: '='
    },
    controller: function ($scope, $element, $attrs) {
      console.log($element);

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
      console.log(element);
	  
	  // Set Highchart options for Sensor2
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: element[0],
		  type: 'solidgauge',
		  spacingTop: 0,
          spacingLeft: 0,
          spacingRight: 0,
          spacingBottom: 0
        },
        title: null,
        tooltip: {
          enabled: false
        },
		pane: {
            size: '80%',
            startAngle: 0,
            endAngle: 360,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
		 yAxis: {
			min: 0,
	        max: 100,
            stops: [
                [0.1, '#DF5353'], // red
				[0.3,'#00ffff'], // green
				[0.45,'#0000ff'],// blue
                [0.6, '#DDDF0D'], // yellow
               	[0.9, '#f3b74c'] // orange
            ],
            lineWidth: 0,
            minorTickInterval: null,
			tickLength: 1,
            tickPixelInterval: 400,
            tickWidth: 0,
			title: {
                y: -70
            },
			labels: {
                y: 22
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: -50,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
		  name: 'Water Level',
          data: scope.discretedata,
		  dataLabels: {
	            formatter: function () {
	                return '<h3>Water Level</h3><h3 style="text-align:center">'+ this.y + '%</h3>';
	            }
				}
        }]
      });
	  
	// Watch function to check the change in data from api call
    scope.$watch("discretedata", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
      
    }
  }
});
