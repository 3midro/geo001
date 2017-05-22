<?php
header('Access-Control-Allow-Origin: http://localhost:8000', false);
function __autoload($classname) {
    $filename = "clases/" . $classname . ".class.php";
    include_once($filename);
}

//$resp = array(); // aqui guarda la respuesta

//recibe variables
$bbox= $_GET["bbox"];
$b = new busqueda();
$conmay = new maysql();
$conmay->conecta_vinom();
$resp = $b->find($bbox, $conmay);
$conmay->cierra_conexion();
$resp=json_encode($resp);
echo $resp;

/*$q = 'SELECT * FROM denue WHERE (X(geom) >= '.$bbox["_southWest"]["lat"].' AND X(geom) <= '.$bbox["_northEast"]["lat"].' ) AND (Y(geom) >= '.$bbox["_southWest"]["lng"].' AND Y(geom) <= '.$bbox["_northEast"]["lng"].');';
$r = $conmay->consulta($q);
$n = $conmay->filas($r);*/



?>