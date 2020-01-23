<?php
require_once('output.php');
require_once('helper.php');

// Initializing Class Object
$apidata = new APIData();
$apidata->title = 'DiscreteDataForWaterLevel';
$apidata->status = 'OK';
$apidata->errormessage = '';
//Load random values in the sensor data using helper function GenerateRandomData($min,$max,$count)
$apidata->data = GenerateRandomData(0,100,1);



echo json_encode($apidata);

?>