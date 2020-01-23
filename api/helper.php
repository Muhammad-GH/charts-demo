<?php
// Generates random data for $count series between $min and $max values
function GenerateRandomData($min,$max,$count){
	$r = array($count);
	for ($i=0;$i<$count;$i++) {
	  $r[$i] = rand($min,$max);
	}
	return $r;
}
?>