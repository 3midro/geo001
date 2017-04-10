<?php
header('Access-Control-Allow-Origin: http://localhost:8000', false);
$a = $_POST['a'];
$b = 456;
$c = $a + $b;
$f = array(
    "code" =>200,
	"msj" => "R=".$c
    );
$resp=json_encode($f);
echo $resp;

?>