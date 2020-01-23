Resources used
==============

High charts
http://www.highcharts.com/demo

-angular.js
https://angularjs.org/

-Bootstrap
http://getbootstrap.com/

-highcharts angular directibe tutorial
http://pablojim.github.io/highcharts-ng/examples/example.html



-frontend is built on using bootstrap, angular and high charts librbay, backend is on PHP tha genrates random json for the frontend.



Backend API
===========

Output
------
This is a class that defines the attributes of the api output result
the $data is the main attribute that transfers result data to the frontend.

Helper
------
This has a function that generates some random data.
GenerateRandomData($min,$max,$count)
the $min and $max are the range limits like 0 to 100 and $count is how many of those random data to be generated.


Sensor API
----------
This is dedicated class for each sensor it initializes the output
Initialize the object 
$apidata = new APIData();
then set the attributes
then set the random data from helper function
encode the output in json and send the data


	
Front End
=========

Angular JS
----------
js/main.js

Main app module
angular.module('myApp', ['myApp.directives']);

Directive module
angular.module('myApp.directives',[])

Main controller
function MyCtrl($scope, $http, limitToFilter)

2 directives to load high chart
.directive('hcSeries', function () {
.directive('hcDiscrete', function () {

door close/open is not high chart but radio button options so no need for directive for that.

The controller has 3 api call functions separate for each sensor data
$scope.fetchsensor1data
$scope.fetchsensor2data
$scope.fetchsensor3data


gloabl variables to store the chart series data 
$scope.sensor1data = []; 
$scope.sensor3data = []; 

when api call updates these series it is automatically updated by highchart 
for that implemented watch functions in directives.
scope.$watch("continuousdata", function (newValue) {
scope.$watch("discretedata", function (newValue) {





