<?php
header('Access-Control-Allow-Origin: http://localhost:8000', false);
function __autoload($classname) {
    $filename = "clases/" . $classname . ".class.php";
    include_once($filename);
}
//recibe variables
$bbox= $_GET["bbox"];
$notIn = $_GET["notIn"];



$conmay = new maysql();
$conmay->conecta_vinom();

$q = 'SELECT * FROM denue where ID = 32';
$r = $conmay->consulta($q);
$n = $conmay->filas($r);

echo $n.'|'.$bbox.'|'.$notIn;
echo "cambio al vuelo sobre php sin volver a compilar"; 
$conmay->cierra_conexion();


?>