<?php
header('Access-Control-Allow-Origin: http://localhost:8000', false);
function __autoload($classname) {
    $filename = "clases/" . $classname . ".class.php";
    include_once($filename);
}
//recibe variables
$bbox= $_GET["bbox"];
$b = new busqueda();
$conmay = new maysql();
$conmay->conecta_vinom();
$resp = $b->find($bbox, $conmay);
$conmay->cierra_conexion();
$resp=json_encode($resp);
echo $resp;

?>